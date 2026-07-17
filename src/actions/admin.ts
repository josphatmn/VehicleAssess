"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVehicleMakes() {
  return prisma.vehicleMake.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { models: true } } },
  });
}

export async function createVehicleMake(data: { name: string }) {
  const make = await prisma.vehicleMake.create({ data });
  revalidatePath("/admin/makes");
  return make;
}

export async function updateVehicleMake(id: string, data: { name: string }) {
  const make = await prisma.vehicleMake.update({ where: { id }, data });
  revalidatePath("/admin/makes");
  return make;
}

export async function deleteVehicleMake(id: string) {
  await prisma.vehicleMake.delete({ where: { id } });
  revalidatePath("/admin/makes");
}

export async function getVehicleModels(makeId?: string) {
  return prisma.vehicleModel.findMany({
    where: makeId ? { makeId } : {},
    orderBy: { name: "asc" },
    include: {
      make: { select: { name: true } },
      _count: { select: { variants: true } },
    },
  });
}

export async function createVehicleModel(data: {
  name: string;
  makeId: string;
}) {
  const model = await prisma.vehicleModel.create({ data });
  revalidatePath("/admin/models");
  return model;
}

export async function updateVehicleModel(
  id: string,
  data: { name: string; makeId: string }
) {
  const model = await prisma.vehicleModel.update({ where: { id }, data });
  revalidatePath("/admin/models");
  return model;
}

export async function deleteVehicleModel(id: string) {
  await prisma.vehicleModel.delete({ where: { id } });
  revalidatePath("/admin/models");
}

export async function getVehicleVariants(modelId?: string) {
  return prisma.vehicleVariant.findMany({
    where: modelId ? { modelId } : {},
    orderBy: { name: "asc" },
    include: {
      model: {
        select: { name: true, make: { select: { name: true } } },
      },
      _count: { select: { parts: true } },
    },
  });
}

export async function createVehicleVariant(data: {
  name: string;
  modelId: string;
}) {
  const variant = await prisma.vehicleVariant.create({ data });
  revalidatePath("/admin/variants");
  return variant;
}

export async function updateVehicleVariant(
  id: string,
  data: { name: string; modelId: string }
) {
  const variant = await prisma.vehicleVariant.update({ where: { id }, data });
  revalidatePath("/admin/variants");
  return variant;
}

export async function deleteVehicleVariant(id: string) {
  await prisma.vehicleVariant.delete({ where: { id } });
  revalidatePath("/admin/variants");
}

export async function getVehicleParts(variantId?: string) {
  return prisma.vehiclePart.findMany({
    where: variantId ? { variantId } : {},
    orderBy: { name: "asc" },
    include: {
      variant: {
        select: {
          name: true,
          model: { select: { name: true, make: { select: { name: true } } } },
        },
      },
    },
  });
}

export async function createVehiclePart(data: {
  partNumber: string;
  name: string;
  category: string;
  unitPrice: number;
  labourCost: number;
  variantId?: string;
}) {
  const part = await prisma.vehiclePart.create({
    data,
  });
  revalidatePath("/admin/parts");
  return part;
}

export async function updateVehiclePart(
  id: string,
  data: {
    partNumber: string;
    name: string;
    category: string;
    unitPrice: number;
    labourCost: number;
    variantId?: string;
    active: boolean;
  }
) {
  const part = await prisma.vehiclePart.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/parts");
  return part;
}

export async function deleteVehiclePart(id: string) {
  await prisma.vehiclePart.delete({ where: { id } });
  revalidatePath("/admin/parts");
}

export async function searchParts(query: string, makeName?: string, modelName?: string) {
  return prisma.vehiclePart.findMany({
    where: {
      active: true,
      name: { contains: query },
      ...(makeName
        ? {
            variant: {
              model: {
                make: { name: { contains: makeName } },
              },
            },
          }
        : {}),
      ...(modelName
        ? {
            variant: {
              model: { name: { contains: modelName } },
            },
          }
        : {}),
    },
    include: {
      variant: {
        select: {
          name: true,
          model: { select: { name: true, make: { select: { name: true } } } },
        },
      },
    },
    take: 20,
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { assessments: true } },
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
  revalidatePath("/admin/users");
  return user;
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function getSuppliers() {
  return prisma.supplier.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { prices: true } },
    },
  });
}

export async function createSupplier(data: {
  name: string;
  website?: string;
  location?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  description?: string;
}) {
  const supplier = await prisma.supplier.create({ data });
  revalidatePath("/admin/suppliers");
  return supplier;
}

export async function updateSupplier(
  id: string,
  data: {
    name: string;
    website?: string;
    location?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    description?: string;
    isActive: boolean;
  }
) {
  const supplier = await prisma.supplier.update({ where: { id }, data });
  revalidatePath("/admin/suppliers");
  return supplier;
}

export async function deleteSupplier(id: string) {
  await prisma.supplier.delete({ where: { id } });
  revalidatePath("/admin/suppliers");
}

export async function toggleSupplierActive(id: string, isActive: boolean) {
  const supplier = await prisma.supplier.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/admin/suppliers");
  return supplier;
}
