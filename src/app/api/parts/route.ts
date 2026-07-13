import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function findCataloguePart(name: string) {
  const clean = name.trim();

  // Strategy 1: Direct contains match
  let match = await prisma.vehiclePart.findFirst({
    where: { name: { contains: clean }, active: true },
    include: { variant: { include: { model: { include: { make: true } } } } },
  });
  if (match) return match;

  // Strategy 2: Reverse match — catalogue name contains the AI name
  const allParts = await prisma.vehiclePart.findMany({
    where: { active: true },
    include: { variant: { include: { model: { include: { make: true } } } } },
  });

  match = allParts.find((p) => p.name.toLowerCase().includes(clean.toLowerCase())) ?? null;
  if (match) return match;

  // Strategy 3: Word overlap — split into significant words and find best overlap
  const stopwords = ["assembly", "the", "a", "an", "and", "or", "left", "right", "front", "rear", "set", "pair"];
  const aiWords = clean
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopwords.includes(w));

  if (aiWords.length > 0) {
    let bestMatch = null;
    let bestScore = 0;

    for (const part of allParts) {
      const partWords = part.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 2);

      const overlap = aiWords.filter((w) => partWords.some((pw) => pw.includes(w) || w.includes(pw)));
      if (overlap.length > bestScore && overlap.length >= Math.ceil(aiWords.length * 0.5)) {
        bestScore = overlap.length;
        bestMatch = part;
      }
    }

    if (bestMatch) return bestMatch;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parts } = body;

    if (!parts || !Array.isArray(parts) || parts.length === 0) {
      return NextResponse.json({ error: "Parts array is required" }, { status: 400 });
    }

    const results = await Promise.all(
      parts.map(async (part: { partName: string; quantity?: number }) => {
        const name = part.partName.trim();
        const quantity = part.quantity || 1;

        const cataloguePart = await findCataloguePart(name);

        if (cataloguePart) {
          return {
            partName: name,
            matchedName: cataloguePart.name,
            found: true,
            vehiclePartId: cataloguePart.id,
            partNumber: cataloguePart.partNumber,
            unitPrice: cataloguePart.unitPrice,
            labourCost: cataloguePart.labourCost,
            subtotal: cataloguePart.unitPrice * quantity,
            category: cataloguePart.category,
            catalogueMake: cataloguePart.variant?.model?.make?.name || null,
            catalogueModel: cataloguePart.variant?.model?.name || null,
            catalogueVariant: cataloguePart.variant?.name || null,
          };
        }

        // Part not found — create a placeholder
        const placeholder = await prisma.vehiclePart.create({
          data: {
            partNumber: `AI-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
            name,
            category: "AI-Detected",
            unitPrice: 0,
            labourCost: 0,
            active: true,
          },
        });

        return {
          partName: name,
          matchedName: null,
          found: false,
          vehiclePartId: placeholder.id,
          partNumber: placeholder.partNumber,
          unitPrice: 0,
          labourCost: 0,
          subtotal: 0,
          category: "AI-Detected",
          catalogueMake: null,
          catalogueModel: null,
          catalogueVariant: null,
        };
      })
    );

    const totalPartsCost = results.reduce((sum, r) => sum + r.subtotal, 0);
    const totalLabourCost = results.reduce((sum, r) => sum + r.labourCost, 0);

    return NextResponse.json({
      parts: results,
      summary: {
        totalPartsCost,
        totalLabourCost,
        grandTotal: totalPartsCost + totalLabourCost,
        foundCount: results.filter((r) => r.found).length,
        notFoundCount: results.filter((r) => !r.found).length,
      },
    });
  } catch (error) {
    console.error("Parts lookup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Parts lookup failed" },
      { status: 500 }
    );
  }
}
