/**
 * Supabase Storage Setup Script
 *
 * Run this once to create the "vehicle-images" bucket and set up access policies.
 *
 * Usage:
 *   npx tsx scripts/setup-storage.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env (get it from Supabase Dashboard > Settings > API)
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env");
  console.error("Get it from: Supabase Dashboard > Settings > API > service_role key");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  const BUCKET = "vehicle-images";

  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);

  if (exists) {
    console.log(`Bucket "${BUCKET}" already exists`);
  } else {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });
    if (error) {
      console.error("Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log(`Created bucket "${BUCKET}"`);
  }

  console.log("\nSetup complete. The bucket is public (anyone can read images).");
  console.log("For production, you may want to add RLS policies via the Supabase Dashboard.");
}

main().catch(console.error);
