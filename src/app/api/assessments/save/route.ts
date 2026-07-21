import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function generateAssessmentNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `VA-${year}-${random}`;
}

function toDate(v: unknown): Date | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return v;
  if (typeof v === "string") {
    const d = new Date(v);
    if (!isNaN(d.getTime())) return d;
  }
  return undefined;
}

// POST: Create a new assessment with optional initial data
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const assessment = await prisma.assessment.create({
      data: {
        assessmentNumber: generateAssessmentNumber(),
        status: "DRAFT",
        userId: session.user.id,
      },
    });

    // If initial claim/vehicle data provided, create sub-tables
    if (body.claim) {
      await prisma.assessmentClaim.create({
        data: { ...body.claim, assessmentId: assessment.id },
      });
    }

    if (body.vehicle) {
      await prisma.assessmentVehicle.create({
        data: {
          ...body.vehicle,
          makeId: body.vehicle.makeId || null,
          modelId: body.vehicle.modelId || null,
          variantId: body.vehicle.variantId || null,
          assessmentId: assessment.id,
        },
      });
    }

    return NextResponse.json({
      id: assessment.id,
      assessmentNumber: assessment.assessmentNumber,
      status: assessment.status,
    });
  } catch (error) {
    console.error("Save assessment error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}

// PATCH: Update an existing assessment with full section data
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Assessment ID is required" }, { status: 400 });
    }

    const existing = await prisma.assessment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    if (existing.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update core fields (status, insuranceCompanyId, repairerId, aiRawResponse)
    const coreUpdate: Record<string, unknown> = {};
    if (data.status) coreUpdate.status = data.status;
    if (data.currentStep) coreUpdate.currentStep = data.currentStep;
    if (data.insuranceCompanyId !== undefined) coreUpdate.insuranceCompanyId = data.insuranceCompanyId || null;
    if (data.repairerId !== undefined) coreUpdate.repairerId = data.repairerId || null;
    if (data.aiRawResponse !== undefined) coreUpdate.aiRawResponse = data.aiRawResponse || null;
    if (Object.keys(coreUpdate).length > 0) {
      await prisma.assessment.update({ where: { id }, data: coreUpdate });
    }

    // Update fee note (Section 1)
    if (data.feeNote) {
      const { id: _, ...feeNoteData } = data.feeNote;
      if (feeNoteData.assessmentDate) {
        const d = toDate(feeNoteData.assessmentDate);
        if (d) feeNoteData.assessmentDate = d;
      }
      await prisma.assessmentFeeNote.upsert({
        where: { assessmentId: id },
        update: feeNoteData,
        create: { ...feeNoteData, assessmentId: id },
      });
    }

    // Update claim (Section 3)
    if (data.claim) {
      const { id: _, ...claimData } = data.claim;
      if (claimData.dateOfInstruction) {
        const d = toDate(claimData.dateOfInstruction);
        if (d) claimData.dateOfInstruction = d;
      }
      if (claimData.dateOfAssessment) {
        const d = toDate(claimData.dateOfAssessment);
        if (d) claimData.dateOfAssessment = d;
      }
      await prisma.assessmentClaim.upsert({
        where: { assessmentId: id },
        update: claimData,
        create: { ...claimData, assessmentId: id },
      });
    }

    // Update vehicle (Section 4)
    if (data.vehicle) {
      const { id: _, makeId, modelId, variantId, ...vehicleData } = data.vehicle;
      await prisma.assessmentVehicle.upsert({
        where: { assessmentId: id },
        update: { ...vehicleData, makeId: makeId || null, modelId: modelId || null, variantId: variantId || null },
        create: { ...vehicleData, assessmentId: id, makeId: makeId || null, modelId: modelId || null, variantId: variantId || null },
      });
    }

    // Update vehicle condition + tyres (Section 5)
    if (data.vehicleCondition) {
      const { tyres, id: _, ...condData } = data.vehicleCondition;
      const cond = await prisma.vehicleCondition.upsert({
        where: { assessmentId: id },
        update: condData,
        create: { ...condData, assessmentId: id },
      });
      if (tyres) {
        await prisma.tyreCondition.deleteMany({ where: { vehicleConditionId: cond.id } });
        if (tyres.length) {
          await prisma.tyreCondition.createMany({
            data: tyres.map((t: { position: string; percentage: number }) => ({
              ...t,
              vehicleConditionId: cond.id,
            })),
          });
        }
      }
    }

    // Update accident details (Section 6)
    if (data.accidentDetail) {
      const { id: _, ...accData } = data.accidentDetail;
      if (accData.accidentDate) {
        const d = toDate(accData.accidentDate);
        if (d) accData.accidentDate = d;
      }
      await prisma.accidentDetail.upsert({
        where: { assessmentId: id },
        update: accData,
        create: { ...accData, assessmentId: id },
      });
    }

    // Update damage items (Section 7)
    if (data.damageItems !== undefined) {
      await prisma.damageItem.deleteMany({ where: { assessmentId: id } });
      if (data.damageItems.length) {
        await prisma.damageItem.createMany({
          data: data.damageItems.map((d: Record<string, unknown>, i: number) => {
            const { id: _, ...itemData } = d;
            return { ...itemData, assessmentId: id, sortOrder: i };
          }),
        });
      }
    }

    // Update parts (Section 8)
    if (data.parts !== undefined) {
      await prisma.assessmentPart.deleteMany({ where: { assessmentId: id } });
      if (data.parts.length) {
        await prisma.assessmentPart.createMany({
          data: data.parts.map((p: Record<string, unknown>, i: number) => {
            const { id: _, ...partData } = p;
            return { ...partData, assessmentId: id, sortOrder: i };
          }),
        });
      }
    }

    // Update services (Section 9)
    if (data.services !== undefined) {
      await prisma.assessmentService.deleteMany({ where: { assessmentId: id } });
      if (data.services.length) {
        await prisma.assessmentService.createMany({
          data: data.services.map((s: Record<string, unknown>, i: number) => {
            const { id: _, ...svcData } = s;
            return { ...svcData, assessmentId: id, sortOrder: i };
          }),
        });
      }
    }

    // Update remarks (Section 11)
    if (data.remark) {
      const { id: _, ...remarkData } = data.remark;
      await prisma.assessmentRemark.upsert({
        where: { assessmentId: id },
        update: remarkData,
        create: { ...remarkData, assessmentId: id },
      });
    }

    // Update additional observations (Section 12)
    if (data.additionalObservations !== undefined) {
      await prisma.additionalDamageObservation.deleteMany({ where: { assessmentId: id } });
      if (data.additionalObservations.length) {
        await prisma.additionalDamageObservation.createMany({
          data: data.additionalObservations.map((o: Record<string, unknown>, i: number) => {
            const { id: _, ...obsData } = o;
            return { ...obsData, assessmentId: id, sortOrder: i };
          }),
        });
      }
    }

    // Update authorization (Section 13)
    if (data.authorization) {
      const { id: _, ...authData } = data.authorization;
      await prisma.assessmentAuthorization.upsert({
        where: { assessmentId: id },
        update: authData,
        create: { ...authData, assessmentId: id },
      });
    }

    // Update special instructions (Section 15)
    if (data.specialInstructions !== undefined) {
      await prisma.assessmentInstruction.deleteMany({ where: { assessmentId: id } });
      if (data.specialInstructions.length) {
        await prisma.assessmentInstruction.createMany({
          data: data.specialInstructions.map((si: { instruction: string }, i: number) => ({
            instruction: si.instruction,
            sortOrder: i,
            assessmentId: id,
          })),
        });
      }
    }

    // Update signatures (Section 16)
    if (data.signatures !== undefined) {
      await prisma.assessmentSignature.deleteMany({ where: { assessmentId: id } });
      if (data.signatures.length) {
        await prisma.assessmentSignature.createMany({
          data: data.signatures.map((sig: Record<string, unknown>) => {
            const { id: _, ...sigData } = sig;
            if (sigData.signatureDate) {
              const d = toDate(sigData.signatureDate);
              if (d) sigData.signatureDate = d;
            }
            return { ...sigData, assessmentId: id };
          }),
        });
      }
    }

    // Update photos
    if (data.photos !== undefined) {
      await prisma.assessmentPhoto.deleteMany({ where: { assessmentId: id } });
      if (data.photos.length) {
        await prisma.assessmentPhoto.createMany({
          data: data.photos.map((p: Record<string, unknown>, i: number) => {
            const { id: _, ...photoData } = p;
            return { ...photoData, assessmentId: id, sortOrder: i };
          }),
        });
      }
    }

    // Handle addImage/removeImage (backward compat)
    if (data.addImage) {
      await prisma.assessmentPhoto.create({
        data: {
          ...data.addImage,
          assessmentId: id,
        },
      });
    }

    if (data.removeImage) {
      const img = await prisma.assessmentPhoto.findFirst({
        where: { assessmentId: id, path: data.removeImage },
      });
      if (img) {
        await prisma.assessmentPhoto.delete({ where: { id: img.id } });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update assessment error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to update assessment" }, { status: 500 });
  }
}
