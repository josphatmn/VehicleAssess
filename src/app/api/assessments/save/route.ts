import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

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
      images,
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
          replacement_parts: parts || [],
        }),
        verifiedVehicleJson: JSON.stringify(vehicle),
        verifiedDamageJson: JSON.stringify(damage),
        userId: session.user.id,
      },
    });

    const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

    if (images?.length) {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const imageData = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const dataUrl = typeof img === "string" ? img : img.dataUrl || img.src || "";
        if (!dataUrl) continue;

        const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;
        const mimeMatch = dataUrl.match(/data:([^;]+)/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const ext = mimeType.includes("png") ? ".png" : mimeType.includes("webp") ? ".webp" : ".jpeg";
        const filename = `${uuid()}${ext}`;
        const buffer = Buffer.from(base64, "base64");

        await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

        imageData.push({
          filename,
          originalName: `photo-${i + 1}${ext}`,
          path: `/uploads/${filename}`,
          mimeType,
          size: buffer.length,
          sortOrder: i,
          assessmentId: assessment.id,
        });
      }
      if (imageData.length) {
        await prisma.assessmentImage.createMany({ data: imageData });
      }
    }

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
    const { id, customer, vehicle, damage, parts, structural_concerns, recommendations, addImage, removeImage } = body;

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

    if (customer) {
      if (customer.fullName !== undefined) updateData.customerName = customer.fullName;
      if (customer.phone !== undefined) updateData.customerPhone = customer.phone;
      if (customer.email !== undefined) updateData.customerEmail = customer.email;
    }

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

    if (addImage) {
      await prisma.assessmentImage.create({
        data: {
          filename: addImage.filename,
          originalName: addImage.originalName,
          path: addImage.path,
          mimeType: addImage.mimeType,
          size: addImage.size,
          sortOrder: addImage.sortOrder ?? 0,
          assessmentId: id,
        },
      });
    }

    if (removeImage) {
      const img = await prisma.assessmentImage.findFirst({ where: { assessmentId: id, path: removeImage } });
      if (img) {
        const filePath = path.join(process.cwd(), "public", img.path);
        await fs.unlink(filePath).catch(() => {});
        await prisma.assessmentImage.delete({ where: { id: img.id } });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update assessment error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to update assessment" }, { status: 500 });
  }
}
