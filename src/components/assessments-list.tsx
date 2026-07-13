"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ASSESSMENT_STATUS_LABELS,
  ASSESSMENT_STATUS_COLORS,
} from "@/types";
import { Eye, Search, Plus } from "lucide-react";

interface Assessment {
  id: string;
  assessmentNumber: string;
  customerName: string;
  status: string;
  vehicleDisplay: string;
  insuranceCompany: string;
  createdAt: string;
}

interface PaginatedResult {
  assessments: Assessment[];
  total: number;
  totalPages: number;
  currentPage: number;
}

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Manage and review vehicle assessments
          </p>
        </div>
        <Link href="/analyze">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by #, customer, registration, VIN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v ?? "")}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(ASSESSMENT_STATUS_LABELS).map(
                  ([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="text-center py-4 text-muted-foreground">
              Loading...
            </div>
          )}
          {!loading && data.assessments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No assessments found
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment #</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.assessments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-sm">
                        {a.assessmentNumber}
                      </TableCell>
                      <TableCell>{a.vehicleDisplay}</TableCell>
                      <TableCell>{a.customerName}</TableCell>
                      <TableCell>{a.insuranceCompany}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            ASSESSMENT_STATUS_COLORS[a.status as keyof typeof ASSESSMENT_STATUS_COLORS] || ""
                          }
                          variant="secondary"
                        >
                          {ASSESSMENT_STATUS_LABELS[a.status as keyof typeof ASSESSMENT_STATUS_LABELS] || a.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/assessments/${a.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {data.totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {data.currentPage} of {data.totalPages} ({data.total}{" "}
                    total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={data.currentPage <= 1}
                      onClick={() => fetchAssessments(data.currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={data.currentPage >= data.totalPages}
                      onClick={() => fetchAssessments(data.currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
