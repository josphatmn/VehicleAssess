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

const supabase = serviceKey ? createClient(supabaseUrl, serviceKey) : null;

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

  // ─── Auth users ──────────────────────────────────────────────────────────────
  console.log("Setting up Supabase Auth users...");
  const adminSupaId = await ensureSupabaseUser("admin@vehicle-assess.com", "admin123", "System Admin");
  const assessorSupaId = await ensureSupabaseUser("assessor@vehicle-assess.com", "assessor123", "John Assessor");
  const publicSupaId = await ensureSupabaseUser("public@vehicle-assess.com", "public123", "Public User");

  const users = [
    {
      email: "admin@vehicle-assess.com",
      name: "System Admin",
      role: "ADMIN",
      supabaseUserId: adminSupaId,
      organization: "Vehicle Assess Kenya",
      phone: "+254 700 000 001",
      licenseNumber: "ADM-001",
      address: "Nairobi",
    },
    {
      email: "assessor@vehicle-assess.com",
      name: "John Assessor",
      role: "ASSESSOR",
      supabaseUserId: assessorSupaId,
      organization: "Forensic Auto Assessors",
      phone: "+254 700 000 002",
      licenseNumber: "ASS-001",
      address: "Nairobi",
    },
    {
      email: "public@vehicle-assess.com",
      name: "Public User",
      role: "ASSESSOR",
      supabaseUserId: publicSupaId,
      organization: "Vehicle Assess Kenya",
      phone: "+254 700 000 003",
      licenseNumber: "ASS-002",
      address: "Nairobi",
    },
  ];

  for (const u of users) {
    const updateData: Record<string, string | null> = {};
    if (u.name) updateData.name = u.name;
    if (u.role) updateData.role = u.role;
    if (u.supabaseUserId) updateData.supabaseUserId = u.supabaseUserId;
    if (u.organization) updateData.organization = u.organization;
    if (u.phone) updateData.phone = u.phone;
    if (u.licenseNumber) updateData.licenseNumber = u.licenseNumber;
    if (u.address) updateData.address = u.address;

    await prisma.user.upsert({
      where: { email: u.email },
      update: updateData,
      create: {
        id: crypto.randomUUID(),
        name: u.name,
        email: u.email,
        role: u.role,
        supabaseUserId: u.supabaseUserId || null,
        organization: u.organization,
        phone: u.phone,
        licenseNumber: u.licenseNumber,
        address: u.address,
      },
    });
  }
  console.log("Users seeded\n");

  // ─── Vehicle makes ───────────────────────────────────────────────────────────
  const makes = ["Toyota", "Nissan", "Mazda", "Ford", "Isuzu", "Mitsubishi", "Honda", "Suzuki"];
  for (const name of makes) {
    await prisma.vehicleMake.upsert({ where: { name }, update: {}, create: { name } });
  }
  console.log(`${makes.length} vehicle makes seeded`);

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
    if (!existing) await prisma.vehicleModel.create({ data: m });
  }
  console.log(`${models.length} vehicle models seeded`);

  // ─── Vehicle parts catalogue ─────────────────────────────────────────────────
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
  console.log(`${parts.length} vehicle parts seeded`);

  // ─── Insurance companies ─────────────────────────────────────────────────────
  const insuranceCompanies = [
    { name: "Jubilee Insurance", phone: "+254 20 328 1000", website: "https://www.jubileeinsurance.com" },
    { name: "Britam Insurance", phone: "+254 20 222 0000", website: "https://www.britam.com" },
    { name: "UAP Old Mutual", phone: "+254 20 233 5000", website: "https://www.oldmutual.co.ke" },
    { name: "CIC Insurance", phone: "+254 20 283 3000", website: "https://www.cicinsurancegroup.com" },
    { name: "APA Insurance", phone: "+254 20 222 6000", website: "https://www.apagroup.co.ke" },
    { name: "Madison Insurance", phone: "+254 20 271 0000", website: "https://www.madison.co.ke" },
    { name: "GA Insurance", phone: "+254 20 329 5000", website: "https://www.gaken.co.ke" },
    { name: "Sanlam Kenya", phone: "+254 20 222 7777", website: "https://www.sanlam.co.ke" },
    { name: "Resolution Insurance", phone: "+254 20 249 0000", website: "https://www.resolutioninsurance.co.ke" },
    { name: "Xplico Insurance", phone: "+254 20 388 0000", website: "https://www.xplicoinsurance.com" },
    { name: "Invesco Assurance", phone: "+254 20 271 3377", website: "https://www.invescoassurance.com" },
    { name: "Kenya Orient Insurance", phone: "+254 20 222 8000", website: "https://www.kenyaorient.co.ke" },
  ];

  for (const ic of insuranceCompanies) {
    const existing = await prisma.insuranceCompany.findFirst({ where: { name: ic.name } });
    if (!existing) {
      await prisma.insuranceCompany.create({ data: ic });
    }
  }
  console.log(`${insuranceCompanies.length} insurance companies seeded`);

  // ─── Repairers / Garages ─────────────────────────────────────────────────────
  const repairers = [
    { name: "CFAO Mobility Kenya Limited", contactPerson: "Service Manager", phone: "+254 722 000 001", location: "Nairobi", address: "Mombasa Road, Nairobi" },
    { name: "Juja Auto Works", contactPerson: "James Mwangi", phone: "+254 722 000 002", location: "Juja", address: "Thika Road, Juja" },
    { name: "Westlands Motor Garage", contactPerson: "Peter Odhiambo", phone: "+254 722 000 003", location: "Nairobi", address: "Waiyaki Way, Westlands" },
    { name: "Karen Auto Repair", contactPerson: "Alice Wanjiku", phone: "+254 722 000 004", location: "Nairobi", address: "Karen Road, Nairobi" },
    { name: "Mombasa Road Motors", contactPerson: "Hassan Ali", phone: "+254 722 000 005", location: "Nairobi", address: "Mombasa Road, Nairobi" },
    { name: "Industrial Area Garage", contactPerson: "David Kiprop", phone: "+254 722 000 006", location: "Nairobi", address: "Enterprise Road, Industrial Area" },
    { name: "Langata Auto Centre", contactPerson: "Grace Nyambura", phone: "+254 722 000 007", location: "Nairobi", address: "Langata Road, Nairobi" },
    { name: "Kiambu Road Garage", contactPerson: "Samuel Maina", phone: "+254 722 000 008", location: "Kiambu", address: "Kiambu Road, Kiambu" },
  ];

  for (const r of repairers) {
    const existing = await prisma.repairer.findFirst({ where: { name: r.name } });
    if (!existing) {
      await prisma.repairer.create({ data: r });
    }
  }
  console.log(`${repairers.length} repairers seeded`);

  // ─── Suppliers ───────────────────────────────────────────────────────────────
  const suppliers = [
    { name: "GreenChey Kenya", location: "Nairobi", website: "https://greenchey.co.ke" },
    { name: "Parts Zone Kenya", location: "Nairobi", website: "https://partszone.co.ke" },
    { name: "CMS Auto Parts", location: "Nairobi", website: "https://cms.co.ke" },
    { name: "Motorcare Kenya", location: "Nairobi", website: "https://motorcare.co.ke" },
    { name: "AutoParts Kenya", location: "Nairobi", website: "https://autoparts.co.ke" },
    { name: "Nairobi Auto Parts", location: "Nairobi", website: "https://nairobautoparts.co.ke" },
    { name: "Kenya Auto Spares", location: "Nairobi", website: "https://kenyaautospares.co.ke" },
    { name: "Mombasa Auto Parts", location: "Mombasa", website: "https://mombasaautoparts.co.ke" },
    { name: "Kisumu Auto Spares", location: "Kisumu", website: "https://kisumuautospares.co.ke" },
    { name: "Eldoret Auto Parts", location: "Eldoret", website: "https://eldoretautoparts.co.ke" },
    { name: "Nakuru Auto Spares", location: "Nakuru", website: "https://nakuruautospares.co.ke" },
    { name: "Thika Auto Parts", location: "Thika", website: "https://thikaautoparts.co.ke" },
    { name: "Nyeri Auto Spares", location: "Nyeri", website: "https://nyeriautospares.co.ke" },
    { name: "Meru Auto Parts", location: "Meru", website: "https://meruautoparts.co.ke" },
    { name: "Machakos Auto Spares", location: "Machakos", website: "https://machakosautospares.co.ke" },
    { name: "Kitale Auto Parts", location: "Kitale", website: "https://kitaleautoparts.co.ke" },
    { name: "Garissa Auto Spares", location: "Garissa", website: "https://garissaautospares.co.ke" },
    { name: "Kakamega Auto Parts", location: "Kakamega", website: "https://kakamegaaautoparts.co.ke" },
    { name: "Kericho Auto Spares", location: "Kericho", website: "https://kerichoautospares.co.ke" },
    { name: "Narok Auto Parts", location: "Narok", website: "https://narokautoparts.co.ke" },
    { name: "Bungoma Auto Spares", location: "Bungoma", website: "https://bungomaautospares.co.ke" },
    { name: "Busia Auto Parts", location: "Busia", website: "https://busiaautoparts.co.ke" },
    { name: "Homa Bay Auto Spares", location: "Homa Bay", website: "https://homabayautospares.co.ke" },
    { name: "Siaya Auto Parts", location: "Siaya", website: "https://siayaautoparts.co.ke" },
    { name: "Murang'a Auto Spares", location: "Murang'a", website: "https://murangaaautospares.co.ke" },
    { name: "Kirinyaga Auto Parts", location: "Kirinyaga", website: "https://kirinyagaautoparts.co.ke" },
    { name: "Laikipia Auto Spares", location: "Laikipia", website: "https://laikipiaautospares.co.ke" },
    { name: "Trans Nzoia Auto Parts", location: "Trans Nzoia", website: "https://transnziaautoparts.co.ke" },
    { name: "Uasin Gishu Auto Spares", location: "Uasin Gishu", website: "https://uasingishuautospares.co.ke" },
    { name: "Bomet Auto Parts", location: "Bomet", website: "https://bometautoparts.co.ke" },
    { name: "Kajiado Auto Spares", location: "Kajiado", website: "https://kajiadoautospares.co.ke" },
    { name: "Kiambu Auto Parts", location: "Kiambu", website: "https://kiambuautoparts.co.ke" },
    { name: "Migori Auto Spares", location: "Migori", website: "https://migoriautospares.co.ke" },
  ];

  for (const s of suppliers) {
    const existing = await prisma.supplier.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.supplier.create({ data: { ...s, isActive: true } });
    }
  }
  console.log(`${suppliers.length} suppliers seeded`);

  // ─── Default app settings ────────────────────────────────────────────────────
  const defaultSettings = [
    { key: "report_price", value: "5000" },
    { key: "vat_rate", value: "16" },
    { key: "currency", value: "KES" },
  ];

  for (const s of defaultSettings) {
    await prisma.appSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`${defaultSettings.length} app settings seeded`);

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
