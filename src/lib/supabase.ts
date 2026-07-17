import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const BUCKET = "vehicle-images";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return browserClient;
}

export async function uploadImage(
  file: File,
  assessmentId: string,
  index: number
): Promise<string> {
  const supabase = getSupabaseBrowser();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${assessmentId}/${Date.now()}-${index}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
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
  const supabase = getSupabaseBrowser();
  await supabase.storage.from(BUCKET).remove([path]);
}
