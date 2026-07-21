"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateAssessmentNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `VA-${year}-${random}`;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const where =
    session.user.role === "ADMIN" ? {} : { userId: session.user.id };

  const [totalAssessments, pendingVerification, completedAssessments, paidCount, revenueResult] =
    await Promise.all([
      prisma.assessment.count({ where }),
      prisma.assessment.count({
        where: { ...where, status: { in: ["AI_ANALYZED", "SUBMITTED", "UNDER_REVIEW"] } },
      }),
      prisma.assessment.count({
        where: { ...where, status: "COMPLETED" },
      }),
      prisma.assessment.count({
        where: { ...where, paid: true },
      }),
      prisma.assessment.aggregate({
        where: { ...where, paid: true },
        _sum: { paymentAmount: true },
      }),
    ]);

  return {
    totalAssessments,
    pendingVerification,
    completedAssessments,
    paidCount,
    totalRevenue: revenueResult._sum.paymentAmount || 0,
  };
}

// ─── Recent Assessments ──────────────────────────────────────────────────────

export async function getRecentAssessments() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const where =
    session.user.role === "ADMIN" ? {} : { userId: session.user.id };

  const assessments = await prisma.assessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      claim: { select: { insuredName: true } },
      vehicle: { select: { registrationNumber: true, make: { select: { name: true } }, vehicleModel: { select: { name: true } } } },
      authorization: { select: { assessmentStatus: true } },
    },
  });

  return assessments.map((a) => ({
    id: a.id,
    assessmentNumber: a.assessmentNumber,
    status: a.authorization?.assessmentStatus || a.status,
    currentStep: a.currentStep || "upload",
    insuredName: a.claim?.insuredName || "N/A",
    registrationNumber: a.vehicle?.registrationNumber || "N/A",
    vehicleMake: a.vehicle?.make?.name || "",
    vehicleModel: a.vehicle?.vehicleModel?.name || "",
    createdAt: a.createdAt.toISOString(),
  }));
}

// ─── Create Assessment ───────────────────────────────────────────────────────

export async function createAssessment() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const assessment = await prisma.assessment.create({
    data: {
      assessmentNumber: generateAssessmentNumber(),
      status: "DRAFT",
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return assessment;
}

// ─── Get Full Assessment ─────────────────────────────────────────────────────

export async function getAssessment(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      insuranceCompany: true,
      repairer: true,
      feeNote: true,
      claim: true,
      vehicle: {
        include: {
          make: true,
          vehicleModel: true,
          variant: true,
        },
      },
      vehicleCondition: { include: { tyres: true } },
      accidentDetail: true,
      damageItems: { orderBy: { sortOrder: "asc" } },
      parts: { orderBy: { sortOrder: "asc" } },
      services: { orderBy: { sortOrder: "asc" } },
      remark: true,
      additionalObservations: { orderBy: { sortOrder: "asc" } },
      authorization: true,
      specialInstructions: { orderBy: { sortOrder: "asc" } },
      signatures: true,
      photos: { orderBy: { sortOrder: "asc" } },
      supplements: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!assessment) throw new Error("Assessment not found");
  return assessment;
}

// ─── Update Assessment (core fields) ─────────────────────────────────────────

export async function updateAssessment(
  id: string,
  data: { status?: string; paid?: boolean; paymentRef?: string; paymentAmount?: number; paymentDate?: Date; aiRawResponse?: unknown }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const updateData: Record<string, unknown> = {};
  if (data.status !== undefined) updateData.status = data.status;
  if (data.paid !== undefined) updateData.paid = data.paid;
  if (data.paymentRef !== undefined) updateData.paymentRef = data.paymentRef;
  if (data.paymentAmount !== undefined) updateData.paymentAmount = data.paymentAmount;
  if (data.paymentDate !== undefined) updateData.paymentDate = data.paymentDate;
  if (data.aiRawResponse !== undefined) updateData.aiRawResponse = JSON.stringify(data.aiRawResponse);

  const assessment = await prisma.assessment.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/dashboard");
  revalidatePath(`/analyze`);
  return assessment;
}

// ─── Save Full Assessment (transactional upsert of all sections) ─────────────

export async function saveFullAssessment(
  assessmentId: string,
  data: {
    feeNote?: Record<string, unknown>;
    claim?: Record<string, unknown>;
    vehicle?: Record<string, unknown>;
    vehicleCondition?: Record<string, unknown> & { tyres?: Array<{ position: string; percentage: number }> };
    accidentDetail?: Record<string, unknown>;
    damageItems?: Array<Record<string, unknown>>;
    parts?: Array<Record<string, unknown>>;
    services?: Array<Record<string, unknown>>;
    remark?: Record<string, unknown>;
    additionalObservations?: Array<Record<string, unknown>>;
    authorization?: Record<string, unknown>;
    specialInstructions?: Array<{ instruction: string; sortOrder: number }>;
    signatures?: Array<Record<string, unknown>>;
    photos?: Array<Record<string, unknown>>;
    status?: string;
  }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    // Update core status if provided
    if (data.status) {
      await tx.assessment.update({
        where: { id: assessmentId },
        data: { status: data.status },
      });
    }

    // Section 1: Fee Note
    if (data.feeNote) {
      const { id: _, ...feeNoteData } = data.feeNote as Record<string, unknown>;
      await tx.assessmentFeeNote.upsert({
        where: { assessmentId },
        update: feeNoteData as never,
        create: { ...feeNoteData, assessmentId } as never,
      });
    }

    // Section 3: Claim
    if (data.claim) {
      const { id: _, ...claimData } = data.claim as Record<string, unknown>;
      await tx.assessmentClaim.upsert({
        where: { assessmentId },
        update: claimData as never,
        create: { ...claimData, assessmentId } as never,
      });
    }

    // Section 4: Vehicle
    if (data.vehicle) {
      const { id: _, makeId, modelId, variantId, ...vehicleData } = data.vehicle as Record<string, unknown>;
      await tx.assessmentVehicle.upsert({
        where: { assessmentId },
        update: { ...vehicleData, makeId: makeId || null, modelId: modelId || null, variantId: variantId || null } as never,
        create: { ...vehicleData, assessmentId, makeId: makeId || null, modelId: modelId || null, variantId: variantId || null } as never,
      });
    }

    // Section 5: Vehicle Condition + Tyres
    if (data.vehicleCondition) {
      const { tyres, id: _, ...condData } = data.vehicleCondition as Record<string, unknown> & { tyres?: Array<Record<string, unknown>> };
      const cond = await tx.vehicleCondition.upsert({
        where: { assessmentId },
        update: condData as never,
        create: { ...condData, assessmentId } as never,
      });
      if (tyres) {
        await tx.tyreCondition.deleteMany({ where: { vehicleConditionId: cond.id } });
        if (tyres.length) {
          await tx.tyreCondition.createMany({
            data: tyres.map((t) => ({ ...t, vehicleConditionId: cond.id }) as never),
          });
        }
      }
    }

    // Section 6: Accident Detail
    if (data.accidentDetail) {
      const { id: _, ...accData } = data.accidentDetail as Record<string, unknown>;
      await tx.accidentDetail.upsert({
        where: { assessmentId },
        update: accData as never,
        create: { ...accData, assessmentId } as never,
      });
    }

    // Section 7: Damage Items
    if (data.damageItems) {
      await tx.damageItem.deleteMany({ where: { assessmentId } });
      if (data.damageItems.length) {
        await tx.damageItem.createMany({
          data: data.damageItems.map((d, i) => {
            const { id: _, ...itemData } = d as Record<string, unknown>;
            return { ...itemData, assessmentId, sortOrder: i } as never;
          }),
        });
      }
    }

    // Section 8: Parts
    if (data.parts) {
      await tx.assessmentPart.deleteMany({ where: { assessmentId } });
      if (data.parts.length) {
        await tx.assessmentPart.createMany({
          data: data.parts.map((p, i) => {
            const { id: _, ...partData } = p as Record<string, unknown>;
            return { ...partData, assessmentId, sortOrder: i } as never;
          }),
        });
      }
    }

    // Section 9: Services
    if (data.services) {
      await tx.assessmentService.deleteMany({ where: { assessmentId } });
      if (data.services.length) {
        await tx.assessmentService.createMany({
          data: data.services.map((s, i) => {
            const { id: _, ...svcData } = s as Record<string, unknown>;
            return { ...svcData, assessmentId, sortOrder: i } as never;
          }),
        });
      }
    }

    // Section 11: Remarks
    if (data.remark) {
      const { id: _, ...remarkData } = data.remark as Record<string, unknown>;
      await tx.assessmentRemark.upsert({
        where: { assessmentId },
        update: remarkData as never,
        create: { ...remarkData, assessmentId } as never,
      });
    }

    // Section 12: Additional Observations
    if (data.additionalObservations) {
      await tx.additionalDamageObservation.deleteMany({ where: { assessmentId } });
      if (data.additionalObservations.length) {
        await tx.additionalDamageObservation.createMany({
          data: data.additionalObservations.map((o, i) => {
            const { id: _, ...obsData } = o as Record<string, unknown>;
            return { ...obsData, assessmentId, sortOrder: i } as never;
          }),
        });
      }
    }

    // Section 13: Authorization
    if (data.authorization) {
      const { id: _, ...authData } = data.authorization as Record<string, unknown>;
      await tx.assessmentAuthorization.upsert({
        where: { assessmentId },
        update: authData as never,
        create: { ...authData, assessmentId } as never,
      });
    }

    // Section 15: Special Instructions
    if (data.specialInstructions) {
      await tx.assessmentInstruction.deleteMany({ where: { assessmentId } });
      if (data.specialInstructions.length) {
        await tx.assessmentInstruction.createMany({
          data: data.specialInstructions.map((si, i) => ({
            instruction: si.instruction,
            sortOrder: i,
            assessmentId,
          })),
        });
      }
    }

    // Section 16: Signatures
    if (data.signatures) {
      await tx.assessmentSignature.deleteMany({ where: { assessmentId } });
      if (data.signatures.length) {
        await tx.assessmentSignature.createMany({
          data: data.signatures.map((sig) => {
            const { id: _, ...sigData } = sig as Record<string, unknown>;
            return { ...sigData, assessmentId } as never;
          }),
        });
      }
    }

    // Photos
    if (data.photos) {
      await tx.assessmentPhoto.deleteMany({ where: { assessmentId } });
      if (data.photos.length) {
        await tx.assessmentPhoto.createMany({
          data: data.photos.map((p, i) => {
            const { id: _, ...photoData } = p as Record<string, unknown>;
            return { ...photoData, assessmentId, sortOrder: i } as never;
          }),
        });
      }
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/analyze");
}

// ─── Save Assessment Photos ──────────────────────────────────────────────────

export async function saveAssessmentPhotos(
  assessmentId: string,
  photos: {
    filename: string;
    originalName: string;
    path: string;
    mimeType: string;
    size: number;
    sortOrder: number;
    caption?: string;
  }[]
) {
  await prisma.assessmentPhoto.createMany({
    data: photos.map((p) => ({ ...p, assessmentId })),
  });

  return prisma.assessmentPhoto.findMany({
    where: { assessmentId },
    orderBy: { sortOrder: "asc" },
  });
}

// ─── Save AI Results ─────────────────────────────────────────────────────────

export async function saveAIResults(
  assessmentId: string,
  aiResult: unknown
) {
  await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      status: "AI_ANALYZED",
      aiRawResponse: JSON.stringify(aiResult),
    },
  });

  const result = aiResult as {
    damaged_parts?: string[];
    replacement_parts?: { partName: string; estimatedQuantity: number }[];
  };

  // Create damage items from AI results
  if (result.damaged_parts?.length) {
    await prisma.damageItem.createMany({
      data: result.damaged_parts.map((part, i) => ({
        partName: part,
        assessmentId,
        sortOrder: i,
      })),
    });
  }

  // Create parts from AI results
  if (result.replacement_parts?.length) {
    await prisma.assessmentPart.createMany({
      data: result.replacement_parts.map((part, i) => ({
        partName: part.partName,
        quantity: typeof part.estimatedQuantity === "number" && part.estimatedQuantity > 0 ? Math.floor(part.estimatedQuantity) : 1,
        assessmentId,
        sortOrder: i,
      })),
    });
  }

  revalidatePath("/analyze");
}

// ─── Delete Assessment ───────────────────────────────────────────────────────

export async function deleteAssessment(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.assessment.delete({ where: { id } });
  revalidatePath("/dashboard");
}

// ─── Payments List ───────────────────────────────────────────────────────────

export async function getPayments(params: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { search, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { paid: true };

  if (session.user.role !== "ADMIN") {
    where.userId = session.user.id;
  }

  if (search) {
    where.OR = [
      { assessmentNumber: { contains: search } },
      { paymentRef: { contains: search } },
      { claim: { insuredName: { contains: search } } },
    ];
  }

  const [payments, total] = await Promise.all([
    prisma.assessment.findMany({
      where,
      orderBy: { paymentDate: "desc" },
      skip,
      take: limit,
      include: {
        claim: { select: { insuredName: true } },
      },
    }),
    prisma.assessment.count({ where }),
  ]);

  return {
    payments: payments.map((p) => ({
      id: p.id,
      assessmentNumber: p.assessmentNumber,
      insuredName: p.claim?.insuredName || "N/A",
      status: p.status,
      currentStep: p.currentStep || "upload",
      paid: p.paid,
      paymentRef: p.paymentRef,
      paymentAmount: p.paymentAmount,
      paymentDate: p.paymentDate?.toISOString() || null,
      createdAt: p.createdAt.toISOString(),
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

// ─── Assessments List ────────────────────────────────────────────────────────

export async function getAssessments(params: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { search, status, page = 1, limit = 20 } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (session.user.role !== "ADMIN") {
    where.userId = session.user.id;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { assessmentNumber: { contains: search } },
      { claim: { insuredName: { contains: search } } },
      { vehicle: { registrationNumber: { contains: search } } },
    ];
  }

  const [assessments, total] = await Promise.all([
    prisma.assessment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        claim: { select: { insuredName: true, policyNumber: true } },
        vehicle: {
          select: {
            registrationNumber: true,
            make: { select: { name: true } },
            vehicleModel: { select: { name: true } },
          },
        },
        authorization: { select: { assessmentStatus: true } },
        insuranceCompany: { select: { name: true } },
      },
    }),
    prisma.assessment.count({ where }),
  ]);

  return {
    assessments: assessments.map((a) => ({
      id: a.id,
      assessmentNumber: a.assessmentNumber,
      status: a.authorization?.assessmentStatus || a.status,
      currentStep: a.currentStep || "upload",
      insuredName: a.claim?.insuredName || "N/A",
      registrationNumber: a.vehicle?.registrationNumber || "N/A",
      vehicleMake: a.vehicle?.make?.name || "",
      vehicleModel: a.vehicle?.vehicleModel?.name || "",
      insuranceCompany: a.insuranceCompany?.name || "N/A",
      createdAt: a.createdAt.toISOString(),
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}
