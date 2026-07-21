import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [makes, insuranceCompanies, repairers] = await Promise.all([
    prisma.vehicleMake.findMany({
      orderBy: { name: "asc" },
      include: {
        models: {
          orderBy: { name: "asc" },
          include: {
            variants: { orderBy: { name: "asc" } },
          },
        },
      },
    }),
    prisma.insuranceCompany.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.repairer.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, contactPerson: true, phone: true, email: true, address: true },
    }),
  ]);

  return NextResponse.json({ makes, insuranceCompanies, repairers });
}
