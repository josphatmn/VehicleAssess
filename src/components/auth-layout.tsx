"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branded */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">VAA</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Vehicle Accident<br />Analyzer
            </h1>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              AI-powered vehicle damage assessment with per-part pricing, supplier matching, and professional PDF reports.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-sm text-gray-400">AI Vision Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-400">30+ Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="text-sm text-gray-400">PDF Reports</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Vehicle Accident Analyzer. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 shadow-lg shadow-gray-300/50">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">VAA</span>
            </Link>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
