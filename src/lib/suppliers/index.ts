import type { SupplierQuote, SupplierSearchParams } from "./types";
import { prisma } from "@/lib/prisma";
import { searchInternet } from "./web-search";
import { CURRENCY } from "@/lib/currency";

export type { SupplierQuote, SupplierSearchParams };

export async function getSupplierPrices(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const { make, model, year, partName } = params;

  const dbQuotes = await searchDatabase(params);
  if (dbQuotes.length > 0) return dbQuotes;

  const webQuotes = await searchInternet(params);

  if (webQuotes.length > 0) {
    await cacheWebResults(webQuotes, params).catch(() => {});
  }

  return webQuotes.map((q) => ({ ...q, currency: CURRENCY }));
}

async function searchDatabase(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const { make, model, year, partName } = params;

  const activeSuppliers = await prisma.supplier.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  if (activeSuppliers.length === 0) return [];

  const results = await Promise.allSettled(
    activeSuppliers.map(async (supplier): Promise<SupplierQuote | null> => {
      const dbPrice = await prisma.supplierPartPrice.findFirst({
        where: {
          supplierId: supplier.id,
          partName: { contains: partName },
          vehicleMake: make || null,
          vehicleModel: model || null,
          ...(year ? { vehicleYear: year } : {}),
        },
        include: { supplier: true },
        orderBy: { updatedAt: "desc" },
      });

      if (dbPrice) {
        return {
          supplier: dbPrice.supplier.name,
          website: dbPrice.supplier.website ?? "",
          part: partName,
          partNumber: dbPrice.partNumber ?? undefined,
          price: dbPrice.price,
          currency: CURRENCY,
          availability: dbPrice.availability,
          url: dbPrice.url ?? undefined,
          brand: dbPrice.brand ?? undefined,
          condition: dbPrice.condition as "OEM" | "Aftermarket" | "Used",
          source: "db",
        };
      }

      const historical = await prisma.partPrice.findFirst({
        where: {
          make,
          model,
          partName: { contains: partName },
          supplier: supplier.name,
        },
        orderBy: { updatedAt: "desc" },
      });

      if (historical) {
        return {
          supplier: supplier.name,
          website: supplier.website ?? "",
          part: partName,
          partNumber: historical.partNumber ?? undefined,
          price: historical.price,
          currency: CURRENCY,
          availability: "Check availability",
          brand: undefined,
          condition: historical.condition as "OEM" | "Aftermarket" | "Used",
          source: "historical",
        };
      }

      return null;
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<SupplierQuote> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value)
    .sort((a, b) => a.price - b.price);
}

async function cacheWebResults(
  quotes: SupplierQuote[],
  params: SupplierSearchParams
): Promise<void> {
  for (const quote of quotes) {
    if (quote.price <= 0) continue;

    const supplier = await prisma.supplier.upsert({
      where: { name: quote.supplier },
      update: { website: quote.website || undefined },
      create: {
        name: quote.supplier,
        website: quote.website || undefined,
      },
    });

    const existing = await prisma.supplierPartPrice.findFirst({
      where: {
        supplierId: supplier.id,
        partName: quote.part,
        vehicleMake: params.make || null,
        vehicleModel: params.model || null,
      },
    });

    if (!existing) {
      await prisma.supplierPartPrice.create({
        data: {
          supplierId: supplier.id,
          partName: quote.part,
          vehicleMake: params.make || null,
          vehicleModel: params.model || null,
          vehicleYear: params.year || null,
          partNumber: quote.partNumber,
          price: quote.price,
          currency: CURRENCY,
          availability: quote.availability,
          brand: quote.brand,
          condition: quote.condition,
          url: quote.url,
          source: "web",
        },
      });
    }
  }
}

export async function findBestPrice(
  params: SupplierSearchParams
): Promise<SupplierQuote | null> {
  const prices = await getSupplierPrices(params);
  return prices[0] ?? null;
}
