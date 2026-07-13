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

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      customer,
      vehicle,
      damage,
      parts,
      structural_concerns,
      recommendations,
    } = body;

    if (!customer?.fullName || !customer?.phone) {
      return NextResponse.json(
        { error: "Customer name and phone are required" },
        { status: 400 }
      );
    }

    const assessment = await prisma.assessment.create({
      data: {
        assessmentNumber: generateAssessmentNumber(),
        status: "AI_ANALYZED",
        customerName: customer.fullName,
        customerPhone: customer.phone,
        customerEmail: customer.email || "",
        insuranceCompany: "",
        claimNumber: "",
        registrationNumber: vehicle?.registration || null,
        vehicleNotes: [vehicle?.make, vehicle?.model, vehicle?.variant, vehicle?.year, vehicle?.body_type, vehicle?.color]
          .filter(Boolean)
          .join(" "),
        aiRawResponse: JSON.stringify({
          vehicle,
          damage,
          structural_concerns,
          recommendations,
        }),
        verifiedVehicleJson: JSON.stringify(vehicle),
        verifiedDamageJson: JSON.stringify(damage),
        userId: session.user.id,
      },
    });

    if (parts?.length) {
      await prisma.assessmentReplacementPart.createMany({
        data: parts.map((p: {
          partName: string;
          quantity: number;
          unitPrice: number;
          labourCost: number;
          subtotal: number;
          found: boolean;
        }) => ({
          partName: p.partName,
          quantity: typeof p.quantity === "number" && p.quantity > 0 ? Math.floor(p.quantity) : 1,
          unitPrice: p.unitPrice || 0,
          subtotal: (p.quantity || 1) * (p.unitPrice || 0),
          assessmentId: assessment.id,
        })),
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

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, vehicle, damage, parts, structural_concerns, recommendations } = body;

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

    const updateData: Record<string, string | null> = {};

    if (vehicle) {
      updateData.registrationNumber = vehicle.registration || existing.registrationNumber;
      updateData.vehicleNotes = [vehicle.make, vehicle.model, vehicle.variant, vehicle.year, vehicle.body_type, vehicle.color]
        .filter(Boolean)
        .join(" ");
      updateData.verifiedVehicleJson = JSON.stringify(vehicle);
    }

    if (damage) {
      updateData.verifiedDamageJson = JSON.stringify(damage);
    }

    if (structural_concerns || recommendations) {
      const aiRaw = existing.aiRawResponse ? JSON.parse(existing.aiRawResponse) : {};
      if (structural_concerns) aiRaw.structural_concerns = structural_concerns;
      if (recommendations) aiRaw.recommendations = recommendations;
      if (vehicle) aiRaw.vehicle = vehicle;
      if (damage) aiRaw.damage = damage;
      updateData.aiRawResponse = JSON.stringify(aiRaw);
    }

    await prisma.assessment.update({ where: { id }, data: updateData });

    if (parts !== undefined) {
      await prisma.assessmentReplacementPart.deleteMany({ where: { assessmentId: id } });
      if (parts.length) {
        await prisma.assessmentReplacementPart.createMany({
          data: parts.map((p: {
            partName: string;
            quantity: number;
            unitPrice: number;
            labourCost: number;
            subtotal: number;
            found: boolean;
          }) => ({
            partName: p.partName,
            quantity: typeof p.quantity === "number" && p.quantity > 0 ? Math.floor(p.quantity) : 1,
            unitPrice: p.unitPrice || 0,
            subtotal: (p.quantity || 1) * (p.unitPrice || 0),
            assessmentId: id,
          })),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update assessment error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to update assessment" }, { status: 500 });
  }
}
