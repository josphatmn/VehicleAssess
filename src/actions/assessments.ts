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

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const where =
    session.user.role === "ADMIN" ? {} : { userId: session.user.id };

  const [totalAssessments, pendingVerification, completedAssessments] =
    await Promise.all([
      prisma.assessment.count({ where }),
      prisma.assessment.count({
        where: { ...where, status: { in: ["AI_ANALYZED", "AWAITING_VERIFICATION"] } },
      }),
      prisma.assessment.count({
        where: { ...where, status: "COMPLETED" },
      }),
    ]);

  return { totalAssessments, pendingVerification, completedAssessments };
}

export async function getRecentAssessments() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const where =
    session.user.role === "ADMIN" ? {} : { userId: session.user.id };

  const assessments = await prisma.assessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      assessmentNumber: true,
      customerName: true,
      status: true,
      registrationNumber: true,
      vehicleNotes: true,
      createdAt: true,
    },
  });

  return assessments.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    vehicleDisplay: [a.registrationNumber, a.vehicleNotes]
      .filter(Boolean)
      .join(" - ") || "N/A",
  }));
}

export async function createAssessment(data: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  insuranceCompany: string;
  claimNumber: string;
  registrationNumber?: string;
  vin?: string;
  odometer?: string;
  vehicleNotes?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const assessment = await prisma.assessment.create({
    data: {
      assessmentNumber: generateAssessmentNumber(),
      status: "DRAFT",
      ...data,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return assessment;
}

export async function getAssessment(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      damagedParts: true,
      replacementParts: true,
      inspectionItems: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!assessment) throw new Error("Assessment not found");

  return assessment;
}

export async function updateAssessment(
  id: string,
  data: {
    status?: string;
    registrationNumber?: string;
    vin?: string;
    odometer?: string;
    vehicleNotes?: string;
    aiRawResponse?: unknown;
    verifiedVehicleJson?: unknown;
    verifiedDamageJson?: unknown;
  }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const processedData: Record<string, string | undefined> = {};
  if (data.status !== undefined) processedData.status = data.status;
  if (data.registrationNumber !== undefined) processedData.registrationNumber = data.registrationNumber;
  if (data.vin !== undefined) processedData.vin = data.vin;
  if (data.odometer !== undefined) processedData.odometer = data.odometer;
  if (data.vehicleNotes !== undefined) processedData.vehicleNotes = data.vehicleNotes;
  if (data.aiRawResponse !== undefined) processedData.aiRawResponse = JSON.stringify(data.aiRawResponse);
  if (data.verifiedVehicleJson !== undefined) processedData.verifiedVehicleJson = JSON.stringify(data.verifiedVehicleJson);
  if (data.verifiedDamageJson !== undefined) processedData.verifiedDamageJson = JSON.stringify(data.verifiedDamageJson);

  const assessment = await prisma.assessment.update({
    where: { id },
    data: processedData,
  });

  revalidatePath("/dashboard");
  revalidatePath(`/assessments/${id}`);
  return assessment;
}

export async function saveAssessmentImages(
  assessmentId: string,
  images: {
    filename: string;
    originalName: string;
    path: string;
    mimeType: string;
    size: number;
    sortOrder: number;
  }[]
) {
  await prisma.assessmentImage.createMany({
    data: images.map((img) => ({ ...img, assessmentId })),
  });

  return prisma.assessmentImage.findMany({
    where: { assessmentId },
    orderBy: { sortOrder: "asc" },
  });
}

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
    damaged_parts: string[];
    replacement_parts: { partName: string; estimatedQuantity: number }[];
    inspection_items: string[];
  };

  if (result.damaged_parts?.length) {
    await prisma.assessmentDamagedPart.createMany({
      data: result.damaged_parts.map((part) => ({
        name: part,
        assessmentId,
      })),
    });
  }

  if (result.replacement_parts?.length) {
    await prisma.assessmentReplacementPart.createMany({
      data: result.replacement_parts.map((part) => ({
        partName: part.partName,
        quantity: typeof part.estimatedQuantity === "number" && part.estimatedQuantity > 0 ? Math.floor(part.estimatedQuantity) : 1,
        unitPrice: 0,
        subtotal: 0,
        assessmentId,
      })),
    });
  }

  if (result.inspection_items?.length) {
    await prisma.inspectionItem.createMany({
      data: result.inspection_items.map((item) => ({
        item,
        assessmentId,
      })),
    });
  }

  revalidatePath(`/assessments/${assessmentId}`);
}

export async function saveVerifiedAssessment(
  assessmentId: string,
  verifiedData: {
    vehicle: {
      make: string;
      model: string;
      variant: string;
      year: string;
      bodyType: string;
      color: string;
      confidence: number;
    };
    damage: {
      severity: string;
      summary: string;
      structuralDamage: boolean;
      rollover: boolean;
      possibleTotalLoss: boolean;
    };
    damagedParts: { name: string; severity: string; confirmed: boolean }[];
    replacementParts: {
      partName: string;
      partNumber: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
      confirmed: boolean;
      vehiclePartId?: string;
    }[];
    inspectionItems: { item: string; notes: string; completed: boolean }[];
    repairRecommendation: string;
  }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    await tx.assessment.update({
      where: { id: assessmentId },
      data: {
        status: "VERIFIED",
        verifiedVehicleJson: JSON.stringify(verifiedData.vehicle),
        verifiedDamageJson: JSON.stringify({
          ...verifiedData.damage,
          repairRecommendation: verifiedData.repairRecommendation,
        }),
      },
    });

    await tx.assessmentDamagedPart.deleteMany({
      where: { assessmentId },
    });
    if (verifiedData.damagedParts.length) {
      await tx.assessmentDamagedPart.createMany({
        data: verifiedData.damagedParts.map((p) => ({
          name: p.name,
          severity: p.severity,
          confirmed: p.confirmed,
          assessmentId,
        })),
      });
    }

    await tx.assessmentReplacementPart.deleteMany({
      where: { assessmentId },
    });
    if (verifiedData.replacementParts.length) {
      await tx.assessmentReplacementPart.createMany({
        data: verifiedData.replacementParts.map((p) => ({
          partName: p.partName,
          partNumber: p.partNumber || null,
          quantity: p.quantity,
          unitPrice: p.unitPrice,
          subtotal: p.subtotal,
          confirmed: p.confirmed,
          vehiclePartId: p.vehiclePartId || null,
          assessmentId,
        })),
      });
    }

    await tx.inspectionItem.deleteMany({ where: { assessmentId } });
    if (verifiedData.inspectionItems.length) {
      await tx.inspectionItem.createMany({
        data: verifiedData.inspectionItems.map((i) => ({
          item: i.item,
          notes: i.notes,
          completed: i.completed,
          assessmentId,
        })),
      });
    }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/assessments/${assessmentId}`);
}

export async function completeAssessment(assessmentId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/assessments/${assessmentId}`);
}

export async function deleteAssessment(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.assessment.delete({ where: { id } });
  revalidatePath("/dashboard");
}

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
      { customerName: { contains: search } },
      { registrationNumber: { contains: search } },
      { vin: { contains: search } },
      { insuranceCompany: { contains: search } },
    ];
  }

  const [assessments, total] = await Promise.all([
    prisma.assessment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        assessmentNumber: true,
        customerName: true,
        status: true,
        registrationNumber: true,
        vehicleNotes: true,
        insuranceCompany: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    }),
    prisma.assessment.count({ where }),
  ]);

  return {
    assessments: assessments.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      vehicleDisplay: [a.registrationNumber, a.vehicleNotes]
        .filter(Boolean)
        .join(" - ") || "N/A",
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}
