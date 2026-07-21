"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/actions/auth";
import { AuthLayout } from "@/components/auth-layout";
import { Loader2, ArrowRight, CheckCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we&apos;ll send you a reset link">
      {state?.success ? (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Check your email</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We&apos;ve sent a password reset link to your email address. It may take a minute to arrive.
            </p>
          </div>
          <div className="rounded-xl bg-gray-100/80 border border-gray-200/60 p-4 flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="text-xs text-gray-500">
              <p>Didn&apos;t receive the email? Check your spam folder, or</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-1 font-semibold text-gray-900 hover:underline"
              >
                try again with a different email
              </button>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          {state?.error && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-600 font-medium">
              {state.error}
            </div>
          )}

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

          <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-300/50 hover:bg-gray-800 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Send Reset Link
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
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-gray-900 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
