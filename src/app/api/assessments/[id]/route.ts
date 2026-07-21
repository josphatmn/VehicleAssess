import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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

  if (!assessment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(assessment);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  // Only allow updating safe fields
  const allowedFields: Record<string, unknown> = {};
  if (body.status !== undefined) allowedFields.status = body.status;
  if (body.paid !== undefined) allowedFields.paid = body.paid;
  if (body.paymentRef !== undefined) allowedFields.paymentRef = body.paymentRef;
  if (body.paymentAmount !== undefined) allowedFields.paymentAmount = body.paymentAmount;
  if (body.paymentDate !== undefined) allowedFields.paymentDate = body.paymentDate;
  if (body.aiRawResponse !== undefined) allowedFields.aiRawResponse = JSON.stringify(body.aiRawResponse);

  const assessment = await prisma.assessment.update({
    where: { id },
    data: allowedFields,
  });

  return NextResponse.json(assessment);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.assessment.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
