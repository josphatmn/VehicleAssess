"use client";

import { Sidebar } from "@/components/sidebar";

interface AppShellProps {
  children: React.ReactNode;
  userRole: string;
  userName: string;
}

export function AppShell({ children, userRole, userName }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      <Sidebar userRole={userRole} userName={userName} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
