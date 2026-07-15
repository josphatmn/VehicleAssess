"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ASSESSMENT_STATUS_LABELS,
  ASSESSMENT_STATUS_COLORS,
} from "@/types";
import { ArrowLeft, Printer, CheckCircle } from "lucide-react";
import Link from "next/link";
import { updateAssessment } from "@/actions/assessments";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/currency";

interface AssessmentDetailProps {
  assessment: {
    id: string;
    assessmentNumber: string;
    status: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    insuranceCompany: string;
    claimNumber: string;
    registrationNumber: string | null;
    vin: string | null;
    odometer: string | null;
    vehicleNotes: string | null;
    verifiedVehicleJson: unknown;
    verifiedDamageJson: unknown;
    aiRawResponse: unknown;
    images: {
      id: string;
      path: string;
      originalName: string;
    }[];
    damagedParts: {
      id: string;
      name: string;
      severity: string | null;
      confirmed: boolean;
    }[];
    replacementParts: {
      id: string;
      partName: string;
      partNumber: string | null;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }[];
    inspectionItems: {
      id: string;
      item: string;
      notes: string | null;
      completed: boolean;
    }[];
    createdAt: Date;
  };
}

export function AssessmentDetail({ assessment }: AssessmentDetailProps) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const vehicle = typeof assessment.verifiedVehicleJson === "string"
    ? JSON.parse(assessment.verifiedVehicleJson)
    : assessment.verifiedVehicleJson as {
    make?: string;
    model?: string;
    variant?: string;
    year?: string;
    bodyType?: string;
    color?: string;
  } | null;

  const damage = typeof assessment.verifiedDamageJson === "string"
    ? JSON.parse(assessment.verifiedDamageJson)
    : assessment.verifiedDamageJson as {
    severity?: string;
    summary?: string;
    structuralDamage?: boolean;
    possibleTotalLoss?: boolean;
    repairRecommendation?: string;
  } | null;

  const totalCost = assessment.replacementParts.reduce(
    (sum, p) => sum + p.subtotal,
    0
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {assessment.assessmentNumber}
            </h1>
            <p className="text-muted-foreground">
              Created: {new Date(assessment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              ASSESSMENT_STATUS_COLORS[
                assessment.status as keyof typeof ASSESSMENT_STATUS_COLORS
              ]
            }
            variant="secondary"
          >
            {ASSESSMENT_STATUS_LABELS[
              assessment.status as keyof typeof ASSESSMENT_STATUS_LABELS
            ]}
          </Badge>
          {assessment.status !== "COMPLETED" && (
            <Button
              variant="default"
              size="sm"
              disabled={updatingStatus}
              onClick={async () => {
                const nextStatus: Record<string, string> = {
                  DRAFT: "AI_ANALYZED",
                  AI_ANALYZED: "AWAITING_VERIFICATION",
                  AWAITING_VERIFICATION: "VERIFIED",
                  VERIFIED: "COMPLETED",
                };
                const next = nextStatus[assessment.status];
                if (!next) return;
                setUpdatingStatus(true);
                try {
                  await updateAssessment(assessment.id, { status: next });
                  window.location.reload();
                } catch {
                  toast.error("Failed to update status");
                } finally {
                  setUpdatingStatus(false);
                }
              }}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              {assessment.status === "DRAFT" && "Mark AI Analyzed"}
              {assessment.status === "AI_ANALYZED" && "Send for Verification"}
              {assessment.status === "AWAITING_VERIFICATION" && "Mark Verified"}
              {assessment.status === "VERIFIED" && "Complete"}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{assessment.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{assessment.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{assessment.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Insurance</p>
              <p className="font-medium">{assessment.insuranceCompany}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Claim #</p>
              <p className="font-medium">{assessment.claimNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {vehicle?.make && (
              <div>
                <p className="text-sm text-muted-foreground">Make</p>
                <p className="font-medium">{vehicle.make}</p>
              </div>
            )}
            {vehicle?.model && (
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{vehicle.model}</p>
              </div>
            )}
            {vehicle?.variant && (
              <div>
                <p className="text-sm text-muted-foreground">Variant</p>
                <p className="font-medium">{vehicle.variant}</p>
              </div>
            )}
            {vehicle?.year && (
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{vehicle.year}</p>
              </div>
            )}
            {vehicle?.bodyType && (
              <div>
                <p className="text-sm text-muted-foreground">Body Type</p>
                <p className="font-medium">{vehicle.bodyType}</p>
              </div>
            )}
            {vehicle?.color && (
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{vehicle.color}</p>
              </div>
            )}
            {assessment.registrationNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Registration</p>
                <p className="font-medium">{assessment.registrationNumber}</p>
              </div>
            )}
            {assessment.vin && (
              <div>
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-medium">{assessment.vin}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {assessment.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Images ({assessment.images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {assessment.images.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-md border overflow-hidden bg-muted"
                >
                  <img
                    src={img.path}
                    alt={img.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {damage && (
        <Card>
          <CardHeader>
            <CardTitle>Damage Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Severity</p>
                <Badge variant="secondary">{damage.severity}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Structural Damage</p>
                <p className="font-medium">
                  {damage.structuralDamage ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Loss</p>
                <p className="font-medium">
                  {damage.possibleTotalLoss ? "Yes" : "No"}
                </p>
              </div>
            </div>
            {damage.summary && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Description
                </p>
                <p>{damage.summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {assessment.damagedParts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Damaged Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {assessment.damagedParts.map((part) => (
                <Badge
                  key={part.id}
                  variant={part.confirmed ? "default" : "outline"}
                >
                  {part.name}
                  {part.severity && ` (${part.severity})`}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {assessment.replacementParts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Replacement Parts - Total: {formatCurrency(totalCost)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessment.replacementParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.partName}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {part.partNumber || "-"}
                    </TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>{formatCurrency(part.unitPrice)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(part.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {assessment.inspectionItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Inspection Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {assessment.inspectionItems.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <span className="text-muted-foreground">-</span>
                  <div>
                    <span>{item.item}</span>
                    {item.notes && (
                      <span className="text-muted-foreground ml-2">
                        ({item.notes})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {damage?.repairRecommendation && (
        <Card>
          <CardHeader>
            <CardTitle>Repair Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{damage.repairRecommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
