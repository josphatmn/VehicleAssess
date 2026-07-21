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

  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return { user: null };
  }

  let dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: session.user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!dbUser && session.user.email) {
    dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, role: true },
    });
    if (dbUser) {
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { supabaseUserId: session.user.id },
        select: { id: true, name: true, email: true, role: true },
      });
    }
  }

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        supabaseUserId: session.user.id,
        name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
        email: session.user.email || "",
        role: "ASSESSOR",
      },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  return { user: dbUser };
}
