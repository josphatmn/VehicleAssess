import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_API = "https://api.paystack.co";

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference");
    if (!reference) {
      return NextResponse.json({ error: "Reference required" }, { status: 400 });
    }

    const res = await fetch(`${PAYSTACK_API}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });

    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ verified: false, status: data.data?.status || "unknown" });
    }

    const meta = data.data.metadata || {};
    const assessmentId = meta.assessmentId;

    if (assessmentId) {
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          paid: true,
          paymentRef: reference,
          paymentAmount: data.data.amount / 100,
          paymentDate: new Date(),
          status: "PAID",
        },
      });
    }

    return NextResponse.json({
      verified: true,
      amount: data.data.amount / 100,
      reference,
      assessmentId,
    });
  } catch (error) {
    console.error("Paystack verify error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
