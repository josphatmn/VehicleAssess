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
        claim: { select: { insuredName: true } },
        vehicle: {
          select: {
            registrationNumber: true,
            make: { select: { name: true } },
            vehicleModel: { select: { name: true } },
          },
        },
        insuranceCompany: { select: { name: true } },
        authorization: { select: { assessmentStatus: true } },
      },
    }),
    prisma.assessment.count({ where }),
  ]);

  return NextResponse.json({
    assessments: assessments.map((a) => ({
      id: a.id,
      assessmentNumber: a.assessmentNumber,
      status: a.authorization?.assessmentStatus || a.status,
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
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  const assessmentNumber = `VA-${year}-${random}`;

  const assessment = await prisma.assessment.create({
    data: {
      assessmentNumber,
      status: "DRAFT",
      userId: session.user.id,
    },
  });

  return NextResponse.json(assessment, { status: 201 });
}
