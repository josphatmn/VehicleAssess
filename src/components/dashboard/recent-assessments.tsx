import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ASSESSMENT_STATUS_LABELS,
  ASSESSMENT_STATUS_COLORS,
} from "@/types";
import { Eye, Plus } from "lucide-react";

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

export function RecentAssessments({ assessments }: RecentAssessmentsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Assessments</CardTitle>
        <Link href="/analyze">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {assessments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No assessments yet. Create your first assessment to get started.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment #</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-mono text-sm">
                    {assessment.assessmentNumber}
                  </TableCell>
                  <TableCell>{assessment.vehicleDisplay}</TableCell>
                  <TableCell>{assessment.customerName}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ASSESSMENT_STATUS_COLORS[assessment.status as keyof typeof ASSESSMENT_STATUS_COLORS] || ""
                      }
                      variant="secondary"
                    >
                      {ASSESSMENT_STATUS_LABELS[assessment.status as keyof typeof ASSESSMENT_STATUS_LABELS] || assessment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/assessments/${assessment.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
