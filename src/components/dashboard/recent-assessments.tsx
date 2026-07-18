import Link from "next/link";
import {
  ASSESSMENT_STATUS_LABELS,
  ASSESSMENT_STATUS_COLORS,
} from "@/types";
import { Eye, ChevronRight, FileText } from "lucide-react";

interface Assessment {
  id: string;
  assessmentNumber: string;
  customerName: string;
  status: string;
  vehicleDisplay: string;
  createdAt: string;
}

interface RecentAssessmentsProps {
  assessments: Assessment[];
}

const statusDot: Record<string, string> = {
  DRAFT: "bg-gray-400",
  AI_ANALYZED: "bg-blue-500",
  AWAITING_VERIFICATION: "bg-amber-500",
  VERIFIED: "bg-violet-500",
  COMPLETED: "bg-emerald-500",
};

export function RecentAssessments({ assessments }: RecentAssessmentsProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Recent Assessments</h2>
        </div>
        <Link
          href="/assessments"
          className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          View all
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-2xl bg-gray-50 p-4 mb-4">
            <FileText className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-900">No assessments yet</p>
          <p className="mt-1 text-xs text-gray-400">Create your first assessment to get started.</p>
          <Link
            href="/analyze"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition"
          >
            New Assessment
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {assessments.map((a, i) => (
            <Link
              key={a.id}
              href={`/analyze?step=results&id=${a.id}`}
              className={`group flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/80 transition-colors animate-fade-in-up animate-delay-${Math.min((i + 1) * 75, 600)}`}
            >
              <div className={`h-2 w-2 rounded-full ${statusDot[a.status] || "bg-gray-300"} shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 font-mono">
                    {a.assessmentNumber}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${ASSESSMENT_STATUS_COLORS[a.status as keyof typeof ASSESSMENT_STATUS_COLORS] || ""}`}>
                    {ASSESSMENT_STATUS_LABELS[a.status as keyof typeof ASSESSMENT_STATUS_LABELS] || a.status}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                  <span>{a.customerName}</span>
                  {a.vehicleDisplay !== "N/A" && (
                    <>
                      <span className="text-gray-300">&middot;</span>
                      <span className="truncate">{a.vehicleDisplay}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleDateString("en-KE", { month: "short", day: "numeric" })}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
