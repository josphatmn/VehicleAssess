import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthSession {
  user: SessionUser | null;
}

export async function auth(): Promise<AuthSession> {
  const supabase = await createClient();

  const { data: { user: authUser }, error } = await supabase.auth.getUser();

  if (error || !authUser) {
    return { user: null };
  }

  let dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: authUser.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!dbUser && authUser.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: { id: true, name: true, email: true, role: true },
    });
    if (dbUser) {
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { supabaseUserId: authUser.id },
        select: { id: true, name: true, email: true, role: true },
      });
    }
  }

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        supabaseUserId: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "User",
        email: authUser.email || "",
        role: "ASSESSOR",
      },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  return { user: dbUser };
}
