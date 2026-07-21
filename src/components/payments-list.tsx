"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CreditCard, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

interface Payment {
  id: string;
  assessmentNumber: string;
  insuredName: string;
  status: string;
  currentStep: string;
  paid: boolean;
  paymentRef: string | null;
  paymentAmount: number | null;
  paymentDate: string | null;
  createdAt: string;
}

interface PaginatedResult {
  payments: Payment[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function PaymentsList({ initialData }: { initialData: PaginatedResult }) {
  const [data, setData] = useState<PaginatedResult>(initialData);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", page.toString());

      const res = await fetch(`/api/payments?${params.toString()}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchPayments(), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const totalPaid = data.payments.reduce((sum, p) => sum + (p.paymentAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">
            View all payments made against assessments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="animate-fade-in-up animate-delay-100">
        <div className="relative max-w-sm">
          <Input
            placeholder="Search by assessment #, insured name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 h-10 rounded-xl border-gray-200 bg-white text-sm"
          />
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm animate-fade-in-up animate-delay-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">
              {data.total} payment{data.total !== 1 ? "s" : ""}
            </h2>
          </div>
          {loading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
        </div>

        {loading && data.payments.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 text-gray-300 animate-spin" />
          </div>
        ) : !loading && data.payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-2xl bg-gray-50 p-4 mb-4">
              <CreditCard className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900">No payments found</p>
            <p className="mt-1 text-xs text-gray-400">Payments will appear here once assessments are paid.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.payments.map((p, i) => (
              <Link
                key={p.id}
                href={`/analyze?step=${p.currentStep}&id=${p.id}`}
                className={`group flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-colors animate-fade-in-up animate-delay-${Math.min((i + 1) * 50, 500)}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 shrink-0">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-gray-900 font-mono">
                      {p.assessmentNumber}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Paid
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{p.insuredName}</span>
                    {p.paymentRef && (
                      <>
                        <span className="text-gray-300">&middot;</span>
                        <span className="font-mono text-gray-400 text-[11px]">{p.paymentRef}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    {formatCurrency(p.paymentAmount || 0)}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {p.paymentDate
                      ? new Date(p.paymentDate).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
              </Link>
            ))}
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
                onClick={() => fetchPayments(data.currentPage - 1)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                disabled={data.currentPage >= data.totalPages}
                onClick={() => fetchPayments(data.currentPage + 1)}
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
