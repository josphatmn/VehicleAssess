import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parts } = body as {
      parts: {
        partName: string;
        vehicleMake?: string;
        vehicleModel?: string;
        pricing_options: { supplier: string; price: number }[];
      }[];
    };

    if (!parts?.length) {
      return NextResponse.json({ error: "No parts provided" }, { status: 400 });
    }

    const result: Record<string, { supplier: string; price: number; supplierPriceId: string }[]> = {};

    for (const part of parts) {
      const prices: { supplier: string; price: number; supplierPriceId: string }[] = [];

      for (const option of part.pricing_options) {
        if (!option.supplier || option.price <= 0) continue;

        const supplier = await prisma.supplier.upsert({
          where: { name: option.supplier },
          update: {},
          create: { name: option.supplier },
        });

        const make = part.vehicleMake || null;
        const model = part.vehicleModel || null;

        const existing = await prisma.supplierPartPrice.findFirst({
          where: {
            supplierId: supplier.id,
            partName: part.partName,
            vehicleMake: make,
            vehicleModel: model,
          },
        });

        let supplierPartPrice;
        if (existing) {
          supplierPartPrice = await prisma.supplierPartPrice.update({
            where: { id: existing.id },
            data: { price: option.price },
          });
        } else {
          supplierPartPrice = await prisma.supplierPartPrice.create({
            data: {
              supplierId: supplier.id,
              partName: part.partName,
              vehicleMake: make,
              vehicleModel: model,
              price: option.price,
            },
          });
        }

        prices.push({
          supplier: supplier.name,
          price: supplierPartPrice.price,
          supplierPriceId: supplierPartPrice.id,
        });
      }

      result[part.partName] = prices;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Save supplier prices error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to save supplier prices" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const partName = searchParams.get("partName");
    const vehicleMake = searchParams.get("vehicleMake") || undefined;
    const vehicleModel = searchParams.get("vehicleModel") || undefined;

    if (!partName) {
      return NextResponse.json({ error: "partName is required" }, { status: 400 });
    }

    const prices = await prisma.supplierPartPrice.findMany({
      where: {
        partName,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
      },
      include: { supplier: true },
      orderBy: { price: "asc" },
    });

    return NextResponse.json(
      prices.map((p) => ({
        supplierPriceId: p.id,
        supplier: p.supplier.name,
        price: p.price,
      }))
    );
  } catch (error) {
    console.error("Fetch supplier prices error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to fetch supplier prices" }, { status: 500 });
  }
}
