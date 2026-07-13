import { getDashboardStats, getRecentAssessments } from "@/actions/assessments";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentAssessments } from "@/components/dashboard/recent-assessments";

export default async function DashboardPage() {
  const [stats, recentAssessments] = await Promise.all([
    getDashboardStats(),
    getRecentAssessments(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your vehicle assessments
        </p>
      </div>

      <StatsCards stats={stats} />
      <RecentAssessments assessments={recentAssessments} />
    </div>
  );
}
