"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  ASSESSMENT_STATUS_LABELS,
  ASSESSMENT_STATUS_COLORS,
} from "@/types";
import { Search, Plus, ChevronRight, ClipboardList, Loader2 } from "lucide-react";

interface Assessment {
  id: string;
  assessmentNumber: string;
  status: string;
  currentStep: string;
  insuredName: string;
  registrationNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  insuranceCompany: string;
  createdAt: string;
}

interface PaginatedResult {
  assessments: Assessment[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const statusDot: Record<string, string> = {
  DRAFT: "bg-gray-400",
  AI_ANALYZED: "bg-blue-500",
  AWAITING_VERIFICATION: "bg-amber-500",
  VERIFIED: "bg-violet-500",
  COMPLETED: "bg-emerald-500",
};

const statusFilters = [
  { value: "", label: "All" },
  { value: "DRAFT", label: "Draft" },
  { value: "AI_ANALYZED", label: "AI Analyzed" },
  { value: "AWAITING_VERIFICATION", label: "Pending" },
  { value: "VERIFIED", label: "Verified" },
  { value: "COMPLETED", label: "Completed" },
];

export function AssessmentsList({ initialData }: { initialData: PaginatedResult }) {
  const [data, setData] = useState<PaginatedResult>(initialData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAssessments = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      params.set("page", page.toString());

      const res = await fetch(`/api/assessments?${params.toString()}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchAssessments(), 300);
    return () => clearTimeout(timeout);
  }, [search, status]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Assessments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review vehicle assessments
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-300/50 hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          New Assessment
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 animate-fade-in-up animate-delay-100">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by #, insured, registration..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl border-gray-200 bg-white text-sm"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-gray-200 p-1">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                status === f.value
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm animate-fade-in-up animate-delay-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">
              {data.total} assessment{data.total !== 1 ? "s" : ""}
            </h2>
          </div>
          {loading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
        </div>

        {loading && data.assessments.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 text-gray-300 animate-spin" />
          </div>
        ) : !loading && data.assessments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-2xl bg-gray-50 p-4 mb-4">
              <ClipboardList className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900">No assessments found</p>
            <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.assessments.map((a, i) => {
              const vehicleDisplay = [a.vehicleMake, a.vehicleModel].filter(Boolean).join(" ") || "N/A";
              return (
                <Link
                  key={a.id}
                  href={`/analyze?step=${a.currentStep}&id=${a.id}`}
                  className={`group flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-colors animate-fade-in-up animate-delay-${Math.min((i + 1) * 50, 500)}`}
                >
                  <div className={`h-2 w-2 rounded-full ${statusDot[a.status] || "bg-gray-300"} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-gray-900 font-mono">
                        {a.assessmentNumber}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${ASSESSMENT_STATUS_COLORS[a.status as keyof typeof ASSESSMENT_STATUS_COLORS] || ""}`}>
                        {ASSESSMENT_STATUS_LABELS[a.status as keyof typeof ASSESSMENT_STATUS_LABELS] || a.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{a.insuredName}</span>
                      {vehicleDisplay !== "N/A" && (
                        <>
                          <span className="text-gray-300">&middot;</span>
                          <span className="truncate">{vehicleDisplay}</span>
                        </>
                      )}
                      {a.insuranceCompany && a.insuranceCompany !== "N/A" && (
                        <>
                          <span className="text-gray-300">&middot;</span>
                          <span className="text-gray-400">{a.insuranceCompany}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">
                      {new Date(a.createdAt).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="flex justify-between items-center border-t border-gray-100 px-6 py-3">
            <p className="text-xs text-gray-400">
              Page {data.currentPage} of {data.totalPages}
            </p>
            <div className="flex gap-1.5">
              <button
                disabled={data.currentPage <= 1}
                onClick={() => fetchAssessments(data.currentPage - 1)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                disabled={data.currentPage >= data.totalPages}
                onClick={() => fetchAssessments(data.currentPage + 1)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
