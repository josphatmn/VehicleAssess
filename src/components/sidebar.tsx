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
} from "lucide-react";
import { useState } from "react";

const assessorNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyze", label: "New Assessment", icon: FilePlus },
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
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

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between border-b px-4 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">VAA</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1 hover:bg-muted"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        <div className="mb-2">
          {!collapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">
              Assessment
            </p>
          )}
          {assessorNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {userRole === "ADMIN" && (
          <div className="mt-4">
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">
                Administration
              </p>
            )}
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="border-t px-4 py-4">
        {!collapsed && (
          <p className="text-sm font-medium truncate mb-2">{userName}</p>
        )}
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/profile"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <User className="h-4 w-4" />
          {!collapsed && <span>Profile</span>}
        </Link>
        <button
          onClick={async () => { const s = createClient(); await s.auth.signOut(); router.push("/login"); router.refresh(); }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
