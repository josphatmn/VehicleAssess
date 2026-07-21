"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";
import { AuthLayout } from "@/components/auth-layout";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/dashboard");
  }, [state, router]);

  return (
    <AuthLayout title="Create your account" subtitle="Get started with Vehicle Accident Analyzer">
      <form action={action} className="space-y-4">
        {state?.error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-600 font-medium">
            {state.error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="At least 6 characters"
            minLength={6}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition"
          />
          <p className="text-xs text-gray-400">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-300/50 hover:bg-gray-800 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gray-50/50 px-3 text-gray-400">or</span>
          </div>
        </div>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-900 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
