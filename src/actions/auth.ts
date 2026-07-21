"use server";

import { loginSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export type LoginState = {
  error?: string;
  success?: boolean;
} | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { error: "Please enter valid credentials" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    return { error: "Invalid email or password" };
  }

  return { success: true };
}

export type RegisterState = {
  error?: string;
  success?: boolean;
  email?: string;
} | undefined;

export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          supabaseUserId: data.user.id,
          name,
          email,
          role: "ASSESSOR",
        },
      });
    }
  }

  return { success: true, email };
}

export type ForgotPasswordState = {
  error?: string;
  success?: boolean;
} | undefined;

export async function forgotPassword(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/update-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export type UpdatePasswordState = {
  error?: string;
  success?: boolean;
} | undefined;

export async function updatePassword(
  _prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
