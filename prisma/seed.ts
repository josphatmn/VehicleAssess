import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const assessorPassword = await bcrypt.hash("assessor123", 10);

  await prisma.user.upsert({
    where: { email: "admin@vehicle-assess.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@vehicle-assess.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "assessor@vehicle-assess.com" },
    update: {},
    create: {
      name: "John Assessor",
      email: "assessor@vehicle-assess.com",
      password: assessorPassword,
      role: "ASSESSOR",
    },
  });

  await prisma.user.upsert({
    where: { email: "public@vehicle-assess.com" },
    update: {},
    create: {
      name: "Public User",
      email: "public@vehicle-assess.com",
      password: await bcrypt.hash("public123", 10),
      role: "ASSESSOR",
    },
  });

  console.log("Users seeded");

  const makes = [
    { name: "Toyota" },
    { name: "Nissan" },
    { name: "Mazda" },
    { name: "Ford" },
    { name: "Isuzu" },
    { name: "Mitsubishi" },
    { name: "Honda" },
    { name: "Suzuki" },
  ];

  for (const make of makes) {
    await prisma.vehicleMake.upsert({
      where: { name: make.name },
      update: {},
      create: make,
    });
  }

  console.log("Vehicle makes seeded");

  const toyotaMake = await prisma.vehicleMake.findUnique({
    where: { name: "Toyota" },
  });

  if (toyotaMake) {
    const models = ["Hilux", "Prado", "Land Cruiser", "Corolla", "RAV4"];
    for (const modelName of models) {
      await prisma.vehicleModel.upsert({
        where: { name_makeId: { name: modelName, makeId: toyotaMake.id } },
        update: {},
        create: { name: modelName, makeId: toyotaMake.id },
      });
    }

    const hilux = await prisma.vehicleModel.findFirst({
      where: { name: "Hilux", makeId: toyotaMake.id },
    });

    if (hilux) {
      const variants = ["SR", "SR5", "Invincible", "Revo", "Double Cab", "Single Cab"];
      for (const variantName of variants) {
        await prisma.vehicleVariant.upsert({
          where: {
            name_modelId: { name: variantName, modelId: hilux.id },
          },
          update: {},
          create: { name: variantName, modelId: hilux.id },
        });
      }

      const variant = await prisma.vehicleVariant.findFirst({
        where: { name: "SR5", modelId: hilux.id },
      });

      if (variant) {
        const parts = [
          {
            partNumber: "TOY-HIL-BP-001",
            name: "Front Bumper",
            category: "BODY",
            unitPrice: 850,
            labourCost: 150,
          },
          {
            partNumber: "TOY-HIL-HL-002",
            name: "Headlight Assembly (Left)",
            category: "EXTERIOR",
            unitPrice: 320,
            labourCost: 80,
          },
          {
            partNumber: "TOY-HIL-HL-003",
            name: "Headlight Assembly (Right)",
            category: "EXTERIOR",
            unitPrice: 320,
            labourCost: 80,
          },
          {
            partNumber: "TOY-HIL-FG-004",
            name: "Front Grille",
            category: "EXTERIOR",
            unitPrice: 180,
            labourCost: 50,
          },
          {
            partNumber: "TOY-HIL-FN-005",
            name: "Front Fender (Left)",
            category: "BODY",
            unitPrice: 290,
            labourCost: 120,
          },
          {
            partNumber: "TOY-HIL-FN-006",
            name: "Front Fender (Right)",
            category: "BODY",
            unitPrice: 290,
            labourCost: 120,
          },
          {
            partNumber: "TOY-HIL-WS-007",
            name: "Windshield",
            category: "GLASS",
            unitPrice: 420,
            labourCost: 100,
          },
          {
            partNumber: "TOY-HIL-BM-008",
            name: "Rear Bumper",
            category: "BODY",
            unitPrice: 650,
            labourCost: 130,
          },
          {
            partNumber: "TOY-HIL-FL-009",
            name: "Front Bumper Reinforcement",
            category: "CHASSIS",
            unitPrice: 480,
            labourCost: 200,
          },
          {
            partNumber: "TOY-HIL-SH-010",
            name: "Front Shock Absorber (Left)",
            category: "SUSPENSION",
            unitPrice: 180,
            labourCost: 90,
          },
          {
            partNumber: "COM-BMP-001",
            name: "Bumper",
            category: "BODY",
            unitPrice: 600,
            labourCost: 120,
          },
          {
            partNumber: "COM-HL-001",
            name: "Headlight",
            category: "EXTERIOR",
            unitPrice: 280,
            labourCost: 70,
          },
          {
            partNumber: "COM-TL-001",
            name: "Tail Light",
            category: "EXTERIOR",
            unitPrice: 180,
            labourCost: 40,
          },
          {
            partNumber: "COM-FN-001",
            name: "Fender",
            category: "BODY",
            unitPrice: 250,
            labourCost: 100,
          },
          {
            partNumber: "COM-DR-001",
            name: "Front Door",
            category: "BODY",
            unitPrice: 900,
            labourCost: 250,
          },
          {
            partNumber: "COM-DR-002",
            name: "Rear Door",
            category: "BODY",
            unitPrice: 850,
            labourCost: 220,
          },
          {
            partNumber: "COM-HD-001",
            name: "Hood",
            category: "BODY",
            unitPrice: 550,
            labourCost: 150,
          },
          {
            partNumber: "COM-RD-001",
            name: "Radiator",
            category: "COOLING",
            unitPrice: 380,
            labourCost: 120,
          },
          {
            partNumber: "COM-CL-001",
            name: "AC Condenser",
            category: "COOLING",
            unitPrice: 320,
            labourCost: 100,
          },
          {
            partNumber: "COM-IC-001",
            name: "Intercooler",
            category: "COOLING",
            unitPrice: 450,
            labourCost: 130,
          },
          {
            partNumber: "COM-MR-001",
            name: "Side Mirror",
            category: "EXTERIOR",
            unitPrice: 150,
            labourCost: 40,
          },
          {
            partNumber: "COM-RP-001",
            name: "Roof Panel",
            category: "BODY",
            unitPrice: 1200,
            labourCost: 400,
          },
          {
            partNumber: "COM-WS-001",
            name: "Windshield",
            category: "GLASS",
            unitPrice: 380,
            labourCost: 90,
          },
          {
            partNumber: "COM-PP-001",
            name: "Pillar",
            category: "CHASSIS",
            unitPrice: 350,
            labourCost: 200,
          },
          {
            partNumber: "COM-XM-001",
            name: "Crossmember",
            category: "CHASSIS",
            unitPrice: 520,
            labourCost: 250,
          },
          {
            partNumber: "COM-SF-001",
            name: "Suspension",
            category: "SUSPENSION",
            unitPrice: 400,
            labourCost: 180,
          },
          {
            partNumber: "COM-EG-001",
            name: "Engine",
            category: "POWERTRAIN",
            unitPrice: 5000,
            labourCost: 1500,
          },
          {
            partNumber: "COM-CH-001",
            name: "Chassis",
            category: "CHASSIS",
            unitPrice: 3000,
            labourCost: 2000,
          },
          {
            partNumber: "COM-FD-001",
            name: "Fog Light",
            category: "EXTERIOR",
            unitPrice: 120,
            labourCost: 30,
          },
          {
            partNumber: "COM-BL-001",
            name: "Bonnet",
            category: "BODY",
            unitPrice: 500,
            labourCost: 140,
          },
          {
            partNumber: "COM-QP-001",
            name: "Quarter Panel",
            category: "BODY",
            unitPrice: 650,
            labourCost: 200,
          },
          {
            partNumber: "COM-RG-001",
            name: "Rocker Panel",
            category: "BODY",
            unitPrice: 380,
            labourCost: 150,
          },
          {
            partNumber: "COM-WG-001",
            name: "Wheel Guard",
            category: "BODY",
            unitPrice: 120,
            labourCost: 40,
          },
          {
            partNumber: "COM-BR-001",
            name: "Brake Caliper",
            category: "BRAKES",
            unitPrice: 280,
            labourCost: 100,
          },
          {
            partNumber: "COM-BD-001",
            name: "Brake Disc",
            category: "BRAKES",
            unitPrice: 180,
            labourCost: 80,
          },
          {
            partNumber: "COM-SL-001",
            name: "Side Skirt",
            category: "BODY",
            unitPrice: 200,
            labourCost: 60,
          },
          {
            partNumber: "COM-WH-001",
            name: "Wheel",
            category: "WHEELS",
            unitPrice: 350,
            labourCost: 30,
          },
          {
            partNumber: "COM-TY-001",
            name: "Tyre",
            category: "WHEELS",
            unitPrice: 200,
            labourCost: 20,
          },
          {
            partNumber: "COM-FS-001",
            name: "Fuel System",
            category: "FUEL",
            unitPrice: 600,
            labourCost: 200,
          },
          {
            partNumber: "COM-EX-001",
            name: "Exhaust System",
            category: "EXHAUST",
            unitPrice: 500,
            labourCost: 180,
          },
        ];

        for (const part of parts) {
          await prisma.vehiclePart.create({ data: { ...part, variantId: variant.id } });
        }
      }
    }
  }

  console.log("Vehicle catalog seeded");

  const nissanMake = await prisma.vehicleMake.findUnique({
    where: { name: "Nissan" },
  });
  if (nissanMake) {
    const models = ["Navara", "X-Trail", "Patrol", "Qashqai"];
    for (const modelName of models) {
      await prisma.vehicleModel.upsert({
        where: { name_makeId: { name: modelName, makeId: nissanMake.id } },
        update: {},
        create: { name: modelName, makeId: nissanMake.id },
      });
    }
  }

  const suppliers = [
    { name: "Toyota Kenya (CFAO Mobility Kenya)", website: "https://toyota.co.ke", location: "Nairobi" },
    { name: "Commercial Motor Spares (CMS)", website: "https://cms.co.ke", location: "Nairobi" },
    { name: "Car Parts Kenya", website: "https://carparts.co.ke", location: "Nairobi" },
    { name: "KM Auto Spares", website: "https://kmautospares.co.ke", location: "Nairobi" },
    { name: "Auto Market Kenya", website: null, location: "Nairobi" },
    { name: "Doukan", website: "https://doukan.co.ke", location: "Nairobi" },
    { name: "HIQ Auto Parts", website: null, location: "Nairobi" },
    { name: "Rev Auto Parts", website: "https://revauto.co.ke", location: "Nairobi" },
    { name: "Spares Kenya", website: null, location: "Nairobi" },
    { name: "Turtle Auto Emporium", website: null, location: "Nairobi" },
    { name: "Garizili", website: null, location: "Nairobi" },
    { name: "AutoXpress Kenya", website: "https://autoxpress.co.ke", location: "Nairobi" },
    { name: "Car & General", website: "https://carandgeneral.com", location: "Nairobi" },
    { name: "Kingsway Tyres", website: null, location: "Nairobi" },
    { name: "Isuzu East Africa", website: "https://isuzu.co.ke", location: "Nairobi" },
    { name: "DT Dobie Kenya", website: "https://dtdobie.co.ke", location: "Nairobi" },
    { name: "Simba Corporation", website: "https://simbacorporation.com", location: "Nairobi" },
    { name: "CMC Motors Group", website: "https://cmcmotors.com", location: "Nairobi" },
    { name: "Ryce East Africa", website: "https://ryceafrica.com", location: "Nairobi" },
    { name: "Bavaria Auto", website: "https://bavariaauto.co.ke", location: "Nairobi" },
    { name: "NG Auto Spares", website: null, location: "Nairobi" },
    { name: "Galaxy Auto", website: null, location: "Nairobi" },
    { name: "Avenge Auto", website: null, location: "Nairobi" },
    { name: "Japan Auto Parts Kenya", website: null, location: "Nairobi" },
    { name: "MotorHub Kenya", website: null, location: "Nairobi" },
    { name: "Auto Zone Kenya", website: null, location: "Nairobi" },
    { name: "Kenya Auto Bazaar", website: null, location: "Nairobi" },
    { name: "Prime Auto Parts", website: null, location: "Nairobi" },
    { name: "Genuine Auto Parts Kenya", website: null, location: "Nairobi" },
    { name: "AutoKenya", website: null, location: "Nairobi" },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: { website: supplier.website, location: supplier.location },
      create: supplier,
    });
  }

  console.log("Suppliers seeded");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
