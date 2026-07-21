import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const BUCKET = "vehicle-images";

let browserClient: SupabaseClient | null = null;
let bucketAvailable: boolean | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return browserClient;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
}

async function checkBucket(): Promise<boolean> {
  if (bucketAvailable !== null) return bucketAvailable;
  const supabase = getSupabaseBrowser();
  const { error } = await supabase.storage.getBucket(BUCKET);
  bucketAvailable = !error;
  return bucketAvailable;
}

export async function uploadImage(
  file: File,
  assessmentId: string,
  index: number
): Promise<string> {
  const hasBucket = await checkBucket();

  if (hasBucket) {
    const supabase = getSupabaseBrowser();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${assessmentId}/${Date.now()}-${index}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (!error) {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return data.publicUrl;
    }
  }

  return fileToDataUrl(file);
}

export async function uploadImages(
  files: File[],
  assessmentId: string
): Promise<string[]> {
  return Promise.all(
    files.map((file, i) => uploadImage(file, assessmentId, i))
  );
}

export function getSupabasePublicUrl(path: string): string {
  const supabase = getSupabaseBrowser();
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(path: string): Promise<void> {
  if (path.includes("supabase")) {
    const supabase = getSupabaseBrowser();
    const url = new URL(path);
    const pathParts = url.pathname.split("/object/public/vehicle-images/");
    if (pathParts[1]) {
      await supabase.storage.from(BUCKET).remove([pathParts[1]]);
    }
  }
}
