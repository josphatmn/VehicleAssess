import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { logoUrl: true },
  });

  return NextResponse.json({ logoUrl: user?.logoUrl || null });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { logo } = await req.json();
    if (!logo || typeof logo !== "string") {
      return NextResponse.json({ error: "No logo data provided" }, { status: 400 });
    }

    const matches = logo.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    const mime = matches[1];
    const ext = mime.split("/")[1] || "png";
    const buffer = Buffer.from(matches[2], "base64");

    const path = `logos/${session.user.id}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(path, buffer, {
        contentType: mime,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload to storage" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("logos").getPublicUrl(path);
    const publicUrl = publicUrlData.publicUrl;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { logoUrl: publicUrl },
    });

    return NextResponse.json({ logoUrl: publicUrl });
  } catch (e) {
    console.error("Logo upload error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to upload logo" }, { status: 500 });
  }
}
