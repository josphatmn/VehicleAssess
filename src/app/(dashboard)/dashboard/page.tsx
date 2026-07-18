import { auth } from "@/lib/auth";
import { getDashboardStats, getRecentAssessments } from "@/actions/assessments";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentAssessments } from "@/components/dashboard/recent-assessments";
import Link from "next/link";
import { FilePlus, ClipboardList, CreditCard, ArrowRight } from "lucide-react";

const quickActions = [
  {
    href: "/analyze",
    label: "New Assessment",
    description: "Start a new vehicle damage assessment",
    icon: FilePlus,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    href: "/assessments",
    label: "View Assessments",
    description: "Browse all your assessments",
    icon: ClipboardList,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    href: "/payments",
    label: "Payment History",
    description: "Review all report payments",
    icon: CreditCard,
    gradient: "from-violet-500 to-purple-600",
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const [stats, recentAssessments] = await Promise.all([
    getDashboardStats(),
    getRecentAssessments(),
  ]);

  const firstName = session?.user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {greeting}, {firstName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your vehicle assessments today.
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <div className="animate-fade-in-up animate-delay-300">
        <div className="grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${action.gradient} p-2.5 shadow-lg shadow-gray-200/50 transition-transform duration-300 group-hover:scale-110`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{action.label}</h3>
              <p className="mt-1 text-xs text-gray-400">{action.description}</p>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="animate-fade-in-up animate-delay-400">
        <RecentAssessments assessments={recentAssessments} />
      </div>
    </div>
  );
}
