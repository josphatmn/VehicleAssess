"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  Car,
  Settings,
  Users,
  Wrench,
  LogOut,
  Shield,
  ChevronLeft,
  Store,
  User,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

const assessorNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyze", label: "New Assessment", icon: FilePlus },
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/payments", label: "Payments", icon: CreditCard },
];

const adminNav = [
  { href: "/admin/makes", label: "Vehicle Makes", icon: Car },
  { href: "/admin/models", label: "Vehicle Models", icon: Car },
  { href: "/admin/variants", label: "Vehicle Variants", icon: Car },
  { href: "/admin/parts", label: "Parts Catalog", icon: Wrench },
  { href: "/admin/suppliers", label: "Suppliers", icon: Store },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  userRole: string;
  userName: string;
}

export function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-[60px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center border-b border-gray-100 px-4 py-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 shadow-md shadow-gray-200/50">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">VAA</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div>
          {!collapsed && (
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Assessment
            </p>
          )}
          <div className="space-y-0.5">
            {assessorNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-2",
                    active
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-300/50"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {active && !collapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-white/80" />
                  )}
                  {active && collapsed && (
                    <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-gray-900" />
                  )}
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {userRole === "ADMIN" && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Administration
              </p>
            )}
            <div className="space-y-0.5">
              {adminNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      collapsed && "justify-center px-2",
                      active
                        ? "bg-gray-900 text-white shadow-lg shadow-gray-300/50"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {active && !collapsed && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-white/80" />
                    )}
                    {active && collapsed && (
                      <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-gray-900" />
                    )}
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="border-t border-gray-100 px-3 py-3 space-y-1">
        <Link
          href="/profile"
          className={cn(
            "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
            collapsed && "justify-center px-2",
            pathname === "/profile"
              ? "bg-gray-900 text-white shadow-lg shadow-gray-300/50"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          )}
          title={collapsed ? userName || "Profile" : undefined}
        >
          {pathname === "/profile" && !collapsed && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-white/80" />
          )}
          {collapsed ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
              {initials || <User className="h-3.5 w-3.5" />}
            </div>
          ) : (
            <>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 shrink-0">
                {initials || <User className="h-3.5 w-3.5" />}
              </div>
              <span className="truncate">{userName || "Profile"}</span>
            </>
          )}
        </Link>
        <button
          onClick={async () => {
            const s = createClient();
            await s.auth.signOut();
            router.push("/login");
            router.refresh();
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
