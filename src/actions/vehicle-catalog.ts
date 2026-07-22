"use server";

import { prisma } from "@/lib/prisma";

interface ResolvedIds {
  makeId: string | undefined;
  modelId: string | undefined;
  variantId: string | undefined;
}

export async function resolveOrCreateVehicle(
  makeName: string,
  modelName?: string,
  variantName?: string
): Promise<ResolvedIds> {
  const result: ResolvedIds = { makeId: undefined, modelId: undefined, variantId: undefined };

  if (!makeName) return result;

  let make = await prisma.vehicleMake.findUnique({
    where: { name: makeName },
  });

  if (!make) {
    make = await prisma.vehicleMake.create({ data: { name: makeName } });
  }
  result.makeId = make.id;

  if (modelName) {
    let model = await prisma.vehicleModel.findUnique({
      where: { name_makeId: { name: modelName, makeId: make.id } },
    });
    if (!model) {
      model = await prisma.vehicleModel.create({
        data: { name: modelName, makeId: make.id },
      });
    }
    result.modelId = model.id;

    if (variantName) {
      let variant = await prisma.vehicleVariant.findUnique({
        where: { name_modelId: { name: variantName, modelId: model.id } },
      });
      if (!variant) {
        variant = await prisma.vehicleVariant.create({
          data: { name: variantName, modelId: model.id },
        });
      }
      result.variantId = variant.id;
    }
  }

  return result;
}
