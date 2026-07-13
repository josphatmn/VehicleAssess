"use client";

import { Sidebar } from "@/components/sidebar";

interface AppShellProps {
  children: React.ReactNode;
  userRole: string;
  userName: string;
}

export function AppShell({ children, userRole, userName }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole={userRole} userName={userName} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
