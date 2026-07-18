import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { createClient } from "@supabase/supabase-js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = serviceKey
  ? createClient(supabaseUrl, serviceKey)
  : null;

async function ensureSupabaseUser(
  email: string,
  password: string,
  name: string
): Promise<string | null> {
  if (!supabase) {
    console.log(`  [skip] No SUPABASE_SERVICE_ROLE_KEY — cannot create auth user for ${email}`);
    return null;
  }

  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === email);
  if (found) {
    console.log(`  [exists] Auth user ${email} (${found.id})`);
    return found.id;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (error) {
    console.error(`  [error] Failed to create auth user ${email}:`, error.message);
    return null;
  }

  console.log(`  [created] Auth user ${email} (${data.user.id})`);
  return data.user.id;
}

async function main() {
  console.log("Seeding database...\n");

  // --- Auth users ---
  console.log("Setting up Supabase Auth users...");
  const adminSupaId = await ensureSupabaseUser("admin@vehicle-assess.com", "admin123", "System Admin");
  const assessorSupaId = await ensureSupabaseUser("assessor@vehicle-assess.com", "assessor123", "John Assessor");
  const publicSupaId = await ensureSupabaseUser("public@vehicle-assess.com", "public123", "Public User");

  const users = [
    { email: "admin@vehicle-assess.com", name: "System Admin", role: "ADMIN", supabaseUserId: adminSupaId },
    { email: "assessor@vehicle-assess.com", name: "John Assessor", role: "ASSESSOR", supabaseUserId: assessorSupaId },
    { email: "public@vehicle-assess.com", name: "Public User", role: "ASSESSOR", supabaseUserId: publicSupaId },
  ];

  for (const u of users) {
    const updateData: Record<string, string> = {};
    if (u.name) updateData.name = u.name;
    if (u.role) updateData.role = u.role;
    if (u.supabaseUserId) updateData.supabaseUserId = u.supabaseUserId;

    await prisma.user.upsert({
      where: { email: u.email },
      update: updateData,
      create: {
        id: crypto.randomUUID(),
        name: u.name,
        email: u.email,
        role: u.role,
        supabaseUserId: u.supabaseUserId || null,
      },
    });
  }

  console.log("Users seeded\n");

  // --- Vehicle makes ---
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

  for (const m of makes) {
    await prisma.vehicleMake.upsert({
      where: { name: m.name },
      update: {},
      create: m,
    });
  }
  console.log(`${makes.length} vehicle makes seeded`);

  // --- Vehicle models ---
  const toyota = await prisma.vehicleMake.findUnique({ where: { name: "Toyota" } });
  const nissan = await prisma.vehicleMake.findUnique({ where: { name: "Nissan" } });
  const mazda = await prisma.vehicleMake.findUnique({ where: { name: "Mazda" } });
  const ford = await prisma.vehicleMake.findUnique({ where: { name: "Ford" } });
  const isuzu = await prisma.vehicleMake.findUnique({ where: { name: "Isuzu" } });
  const mitsubishi = await prisma.vehicleMake.findUnique({ where: { name: "Mitsubishi" } });
  const honda = await prisma.vehicleMake.findUnique({ where: { name: "Honda" } });
  const suzuki = await prisma.vehicleMake.findUnique({ where: { name: "Suzuki" } });

  const models = [
    { name: "Hilux", makeId: toyota!.id },
    { name: "Prado", makeId: toyota!.id },
    { name: "Land Cruiser", makeId: toyota!.id },
    { name: "Corolla", makeId: toyota!.id },
    { name: "RAV4", makeId: toyota!.id },
    { name: "Pathfinder", makeId: nissan!.id },
    { name: "X-Trail", makeId: nissan!.id },
    { name: "Navara", makeId: nissan!.id },
    { name: "CX-5", makeId: mazda!.id },
    { name: "BT-50", makeId: mazda!.id },
    { name: "Ranger", makeId: ford!.id },
    { name: "Everest", makeId: ford!.id },
    { name: "MU-X", makeId: isuzu!.id },
    { name: "D-Max", makeId: isuzu!.id },
    { name: "Outlander", makeId: mitsubishi!.id },
    { name: "Triton", makeId: mitsubishi!.id },
    { name: "CR-V", makeId: honda!.id },
    { name: "Vitara", makeId: suzuki!.id },
  ];

  for (const m of models) {
    const existing = await prisma.vehicleModel.findFirst({ where: { name: m.name, makeId: m.makeId } });
    if (!existing) {
      await prisma.vehicleModel.create({ data: m });
    }
  }
  console.log(`${models.length} vehicle models seeded`);

  // --- Damaged parts ---
  const parts = [
    { name: "Front Bumper", category: "Body" },
    { name: "Rear Bumper", category: "Body" },
    { name: "Bonnet", category: "Body" },
    { name: "Front Fender (Left)", category: "Body" },
    { name: "Front Fender (Right)", category: "Body" },
    { name: "Rear Fender (Left)", category: "Body" },
    { name: "Rear Fender (Right)", category: "Body" },
    { name: "Front Door (Left)", category: "Body" },
    { name: "Front Door (Right)", category: "Body" },
    { name: "Rear Door (Left)", category: "Body" },
    { name: "Rear Door (Right)", category: "Body" },
    { name: "Tailgate", category: "Body" },
    { name: "Roof Panel", category: "Body" },
    { name: "A-Pillar (Left)", category: "Structural" },
    { name: "A-Pillar (Right)", category: "Structural" },
    { name: "B-Pillar (Left)", category: "Structural" },
    { name: "B-Pillar (Right)", category: "Structural" },
    { name: "C-Pillar (Left)", category: "Structural" },
    { name: "C-Pillar (Right)", category: "Structural" },
    { name: "Front Crossmember", category: "Structural" },
    { name: "Rear Crossmember", category: "Structural" },
    { name: "Chassis Rail (Left)", category: "Structural" },
    { name: "Chassis Rail (Right)", category: "Structural" },
    { name: "Headlight (Left)", category: "Lighting" },
    { name: "Headlight (Right)", category: "Lighting" },
    { name: "Tail Light (Left)", category: "Lighting" },
    { name: "Tail Light (Right)", category: "Lighting" },
    { name: "Fog Light (Left)", category: "Lighting" },
    { name: "Fog Light (Right)", category: "Lighting" },
    { name: "Windshield", category: "Glass" },
    { name: "Rear Windshield", category: "Glass" },
    { name: "Side Window (Left)", category: "Glass" },
    { name: "Side Window (Right)", category: "Glass" },
    { name: "Radiator Support", category: "Structural" },
    { name: "Grille", category: "Body" },
    { name: "Side Mirror (Left)", category: "Accessories" },
    { name: "Side Mirror (Right)", category: "Accessories" },
    { name: "Front Wheel", category: "Wheels" },
    { name: "Rear Wheel", category: "Wheels" },
    { name: "Spare Wheel", category: "Wheels" },
  ];

  for (const p of parts) {
    const existing = await prisma.vehiclePart.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.vehiclePart.create({
        data: {
          name: p.name,
          category: p.category,
          partNumber: `VP-${p.name.replace(/\s+/g, "-").toUpperCase().slice(0, 20)}`,
          unitPrice: 0,
          labourCost: 0,
        },
      });
    }
  }
  console.log(`${parts.length} damaged parts seeded`);

  // --- Suppliers ---
  const suppliers = [
    { name: "GreenChey Kenya", location: "Nairobi", website: "https://greenchey.co.ke", isActive: true },
    { name: "Parts Zone Kenya", location: "Nairobi", website: "https://partszone.co.ke", isActive: true },
    { name: "CMS Auto Parts", location: "Nairobi", website: "https://cms.co.ke", isActive: true },
    { name: "Motorcare Kenya", location: "Nairobi", website: "https://motorcare.co.ke", isActive: true },
    { name: "AutoParts Kenya", location: "Nairobi", website: "https://autoparts.co.ke", isActive: true },
    { name: "Nairobi Auto Parts", location: "Nairobi", website: "https://nairobautoparts.co.ke", isActive: true },
    { name: "Kenya Auto Spares", location: "Nairobi", website: "https://kenyaautospares.co.ke", isActive: true },
    { name: "Mombasa Auto Parts", location: "Mombasa", website: "https://mombasaautoparts.co.ke", isActive: true },
    { name: "Kisumu Auto Spares", location: "Kisumu", website: "https://kisumuautospares.co.ke", isActive: true },
    { name: "Eldoret Auto Parts", location: "Eldoret", website: "https://eldoretautoparts.co.ke", isActive: true },
    { name: "Nakuru Auto Spares", location: "Nakuru", website: "https://nakuruautospares.co.ke", isActive: true },
    { name: "Thika Auto Parts", location: "Thika", website: "https://thikaautoparts.co.ke", isActive: true },
    { name: "Nyeri Auto Spares", location: "Nyeri", website: "https://nyeriautospares.co.ke", isActive: true },
    { name: "Meru Auto Parts", location: "Meru", website: "https://meruautoparts.co.ke", isActive: true },
    { name: "Machakos Auto Spares", location: "Machakos", website: "https://machakosautospares.co.ke", isActive: true },
    { name: "Kitale Auto Parts", location: "Kitale", website: "https://kitaleautoparts.co.ke", isActive: true },
    { name: "Garissa Auto Spares", location: "Garissa", website: "https://garissaautospares.co.ke", isActive: true },
    { name: "Kakamega Auto Parts", location: "Kakamega", website: "https://kakamegaaautoparts.co.ke", isActive: true },
    { name: "Kericho Auto Spares", location: "Kericho", website: "https://kerichoautospares.co.ke", isActive: true },
    { name: "Narok Auto Parts", location: "Narok", website: "https://narokautoparts.co.ke", isActive: true },
    { name: "Bungoma Auto Spares", location: "Bungoma", website: "https://bungomaautospares.co.ke", isActive: true },
    { name: "Busia Auto Parts", location: "Busia", website: "https://busiaautoparts.co.ke", isActive: true },
    { name: "Homa Bay Auto Spares", location: "Homa Bay", website: "https://homabayautospares.co.ke", isActive: true },
    { name: "Siaya Auto Parts", location: "Siaya", website: "https://siayaautoparts.co.ke", isActive: true },
    { name: "Murang'a Auto Spares", location: "Murang'a", website: "https://murangaaautospares.co.ke", isActive: true },
    { name: "Kirinyaga Auto Parts", location: "Kirinyaga", website: "https://kirinyagaautoparts.co.ke", isActive: true },
    { name: "Laikipia Auto Spares", location: "Laikipia", website: "https://laikipiaautospares.co.ke", isActive: true },
    { name: "Trans Nzoia Auto Parts", location: "Trans Nzoia", website: "https://transnziaautoparts.co.ke", isActive: true },
    { name: "Uasin Gishu Auto Spares", location: "Uasin Gishu", website: "https://uasingishuautospares.co.ke", isActive: true },
    { name: "Bomet Auto Parts", location: "Bomet", website: "https://bometautoparts.co.ke", isActive: true },
    { name: "Kajiado Auto Spares", location: "Kajiado", website: "https://kajiadoautospares.co.ke", isActive: true },
    { name: "Kiambu Auto Parts", location: "Kiambu", website: "https://kiambuautoparts.co.ke", isActive: true },
    { name: "Migori Auto Spares", location: "Migori", website: "https://migoriautospares.co.ke", isActive: true },
  ];

  for (const s of suppliers) {
    const existing = await prisma.supplier.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.supplier.create({ data: s });
    }
  }
  console.log(`${suppliers.length} suppliers seeded`);

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
