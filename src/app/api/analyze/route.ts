import { NextRequest, NextResponse } from "next/server";
import { analyzeImages } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const result = await analyzeImages(images);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI analysis error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "AI analysis failed",
      },
      { status: 500 }
    );
  }
}
