import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (session.user.role !== "ADMIN") {
    where.userId = session.user.id;
  }

  if (status && status !== "all") {
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
      },
    }),
    prisma.assessment.count({ where }),
  ]);

  return NextResponse.json({
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
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  const assessmentNumber = `VA-${year}-${random}`;

  const assessment = await prisma.assessment.create({
    data: {
      assessmentNumber,
      status: "DRAFT",
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      insuranceCompany: body.insuranceCompany,
      claimNumber: body.claimNumber,
      registrationNumber: body.registrationNumber,
      vin: body.vin,
      odometer: body.odometer,
      vehicleNotes: body.vehicleNotes,
      userId: session.user.id,
    },
  });

  return NextResponse.json(assessment, { status: 201 });
}
