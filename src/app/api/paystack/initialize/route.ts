import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_API = "https://api.paystack.co";

export async function POST(req: NextRequest) {
  try {
    if (!PAYSTACK_SECRET) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assessmentId, email } = await req.json();

    if (!assessmentId || !email) {
      return NextResponse.json({ error: "assessmentId and email required" }, { status: 400 });
    }

    const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } });
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    const setting = await prisma.appSetting.findUnique({ where: { key: "report_price" } });
    const amountKES = parseInt(setting?.value || "500", 10);
    const amountPesos = amountKES * 100;

    const callbackUrl = `${req.nextUrl.origin}/analyze?step=results&id=${assessmentId}`;
    const reference = `VA-${assessment.assessmentNumber}-${Date.now()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let res: Response;
    try {
      res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountPesos,
          currency: "KES",
          reference,
          callback_url: callbackUrl,
          metadata: {
            assessmentId,
            userId: session.user.id,
            assessmentNumber: assessment.assessmentNumber,
          },
        }),
        signal: controller.signal,
      });
    } catch (fetchErr) {
      console.error("Paystack API fetch failed:", fetchErr instanceof Error ? fetchErr.message : fetchErr);
      return NextResponse.json({ error: "Could not reach Paystack API. Check network connectivity." }, { status: 502 });
    } finally {
      clearTimeout(timeout);
    }

    const data = await res.json();
    console.log("Paystack init response:", JSON.stringify({ status: data.status, reference }));

    if (!data.status) {
      return NextResponse.json({ error: data.message || "Payment initialization failed" }, { status: 400 });
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
      amount: amountKES,
    });
  } catch (error) {
    console.error("Paystack init error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
