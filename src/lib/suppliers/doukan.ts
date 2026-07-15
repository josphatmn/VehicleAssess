import { prisma } from "@/lib/prisma";
import type { SupplierAdapter } from "./types";

export const searchDoukan: SupplierAdapter = async (params) => {
  const { make, model, year, partName } = params;

  const dbPrice = await prisma.supplierPartPrice.findFirst({
    where: {
      supplier: { name: "Doukan Auto" },
      partName: { contains: partName },
      vehicleMake: make || null,
      vehicleModel: model || null,
    },
    include: { supplier: true },
    orderBy: { updatedAt: "desc" },
  });

  if (dbPrice) {
    return {
      supplier: dbPrice.supplier.name,
      website: "https://doukan.co.ke",
      part: partName,
      partNumber: dbPrice.partNumber || undefined,
      price: dbPrice.price,
      currency: dbPrice.currency,
      availability: dbPrice.availability,
      url: dbPrice.url || undefined,
      brand: dbPrice.brand || undefined,
      condition: dbPrice.condition as "OEM" | "Aftermarket" | "Used",
      source: "db",
    };
  }

  const historical = await prisma.partPrice.findFirst({
    where: {
      make,
      model,
      partName: { contains: partName },
      supplier: "Doukan Auto",
    },
    orderBy: { updatedAt: "desc" },
  });

  if (historical) {
    return {
      supplier: "Doukan Auto",
      website: "https://doukan.co.ke",
      part: partName,
      partNumber: historical.partNumber || undefined,
      price: historical.price,
      currency: historical.currency,
      availability: "Check availability",
      brand: undefined,
      condition: historical.condition as "OEM" | "Aftermarket" | "Used",
      source: "historical",
    };
  }

  return null;
};
