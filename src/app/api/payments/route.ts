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
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
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

  return NextResponse.json({
    payments: payments.map((p) => ({
      id: p.id,
      assessmentNumber: p.assessmentNumber,
      insuredName: p.claim?.insuredName || "N/A",
      status: p.status,
      paid: p.paid,
      paymentRef: p.paymentRef,
      paymentAmount: p.paymentAmount,
      paymentDate: p.paymentDate?.toISOString() || null,
      createdAt: p.createdAt.toISOString(),
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}
