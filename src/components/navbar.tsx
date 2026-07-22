"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession } from "@/hooks/use-session";

interface NavbarProps {
  onNewAnalysis?: () => void;
  showNewAnalysis?: boolean;
}

export function Navbar({ onNewAnalysis, showNewAnalysis }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            VA
          </div>
          VehicleAssess
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/#features" className="hover:text-gray-900 transition">Features</Link>
          <Link href="/#how-it-works" className="hover:text-gray-900 transition">How It Works</Link>
          <Link href="/analyze" className="hover:text-gray-900 transition">Analyze</Link>
          {showNewAnalysis && onNewAnalysis && (
            <button onClick={onNewAnalysis} className="hover:text-gray-900 transition">New Analysis</button>
          )}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <User className="w-4 h-4" />
              {user.name || user.email}
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/analyze"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-500/25"
          >
            Start Analysis
          </Link>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link href="/#features" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="/#how-it-works" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link href="/analyze" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>Analyze</Link>
          {showNewAnalysis && onNewAnalysis && (
            <button onClick={() => { onNewAnalysis(); setMobileOpen(false); }} className="block text-sm font-medium text-gray-600 hover:text-gray-900">New Analysis</button>
          )}
          <hr />
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMobileOpen(false)}>
              <User className="w-4 h-4" /> {user.name || user.email}
            </Link>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</Link>
          )}
          <Link href="/analyze" className="block text-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg" onClick={() => setMobileOpen(false)}>Start Analysis</Link>
        </div>
      )}
    </header>
  );
}
