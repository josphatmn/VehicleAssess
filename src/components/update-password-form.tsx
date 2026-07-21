"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/actions/auth";
import { AuthLayout } from "@/components/auth-layout";
import { Loader2, ArrowRight, CheckCircle, Shield } from "lucide-react";
import Link from "next/link";

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  }, [state, router]);

  return (
    <AuthLayout title="Set new password" subtitle="Choose a strong password for your account">
      {state?.success ? (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Password updated!</h3>
            <p className="text-sm text-gray-500">
              Redirecting you to the dashboard...
            </p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          {state?.error && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-600 font-medium">
              {state.error}
            </div>
          )}

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-3.5 flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-600 leading-relaxed">
              You&apos;re resetting your password via a secure link. Choose something strong and unique.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              minLength={6}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              minLength={6}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition"
            />
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
                Update Password
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
