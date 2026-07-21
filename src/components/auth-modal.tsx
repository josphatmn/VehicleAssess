"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { X, Loader2, MailCheck } from "lucide-react";
import { login, register } from "@/actions/auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [loginState, loginAction, loginPending] = useActionState(login, undefined);
  const [registerState, registerAction, registerPending] = useActionState(register, undefined);
  const closedRef = useRef(false);

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    if (loginState?.success && !closedRef.current) {
      closedRef.current = true;
      onClose();
    }
  }, [loginState]);

  useEffect(() => {
    if (!open) return;
    closedRef.current = false;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-4 text-sm font-semibold transition ${tab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-4 text-sm font-semibold transition ${tab === "register" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"}`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6">
          {tab === "login" ? (
            <form action={loginAction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>
              {loginState?.error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{loginState.error}</p>
              )}
              <button
                type="submit"
                disabled={loginPending}
                className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loginPending ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Demo: admin@vehicle-assess.com / admin123
              </p>
            </form>
          ) : registerState?.success ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <MailCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Check your email</h3>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to <span className="font-medium text-gray-700">{registerState.email}</span>. Check the email sent from <span className="font-medium text-gray-700">Supabase Auth</span> with subject <span className="font-medium text-gray-700">&quot;Confirm your email address&quot;</span> and follow the instructions to confirm before logging in.
              </p>
              <button
                onClick={() => setTab("login")}
                className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form action={registerAction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="At least 6 characters"
                />
              </div>
              {registerState?.error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{registerState.error}</p>
              )}
              <button
                type="submit"
                disabled={registerPending}
                className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {registerPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {registerPending ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
