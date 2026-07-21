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
    paid: boolean;
    user: { name: string; email: string } | null;
    insuranceCompany: { name: string; phone: string | null; email: string | null } | null;
    repairer: { name: string; contactPerson: string | null; phone: string | null; email: string | null; address: string | null } | null;
    feeNote: {
      referenceNumber: string | null;
      assessmentDate: Date | null;
      professionalFee: number;
      vat: number;
      reimbursement: number;
      totalProfessionalFee: number;
    } | null;
    claim: {
      claimNumber: string | null;
      insuredName: string | null;
      insuredPhone: string | null;
      insuredEmail: string | null;
      insuredAddress: string | null;
      policyNumber: string | null;
      sumInsured: number | null;
      excessPercentage: number | null;
      excessAmount: number | null;
      dateOfInstruction: Date | null;
      dateOfAssessment: Date | null;
    } | null;
    vehicle: {
      registrationNumber: string | null;
      colour: string | null;
      yearOfManufacture: number | null;
      engineType: string | null;
      engineNumber: string | null;
      chassisNumber: string | null;
      vin: string | null;
      mileage: string | null;
      make: { name: string } | null;
      vehicleModel: { name: string } | null;
      variant: { name: string } | null;
    } | null;
    vehicleCondition: {
      overallCondition: string | null;
      mechanicalCondition: string | null;
      interiorCondition: string | null;
      exteriorCondition: string | null;
      tyreBrand: string | null;
      tyres: { position: string; percentage: number }[];
    } | null;
    accidentDetail: {
      accidentDate: Date | null;
      accidentLocation: string | null;
      accidentDescription: string | null;
      damageDescription: string | null;
      damageConsistentWithAccident: boolean | null;
      damageConsistencyNote: string | null;
    } | null;
    damageItems: Array<{
      damageArea: string | null;
      partName: string | null;
      side: string | null;
      damageDescription: string | null;
      actionRequired: string | null;
      accidentRelated: boolean;
      preAccidentDamage: boolean;
      remarks: string | null;
      sortOrder: number;
    }>;
    parts: Array<{
      partName: string;
      partNumber: string | null;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>;
    services: Array<{
      description: string;
      quantity: number;
      totalCost: number;
      serviceType: string | null;
    }>;
    remark: {
      generalRemarks: string | null;
      partsToBeReplaced: string | null;
      preAccidentDamage: string | null;
    } | null;
    authorization: {
      authorizationStatus: string | null;
      assessmentStatus: string | null;
      authorized: boolean | null;
      salvageValue: number | null;
      preAccidentValue: number | null;
    } | null;
    photos: {
      id: string;
      path: string;
      originalName: string;
      caption: string | null;
    }[];
    signatures: {
      role: string;
      name: string | null;
      organization: string | null;
      phone: string | null;
      signatureDate: Date | null;
    }[];
    aiRawResponse: string | null;
    createdAt: Date;
  };
}

export function AssessmentDetail({ assessment }: AssessmentDetailProps) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const partsTotal = assessment.parts.reduce((sum, p) => sum + (p.totalPrice || 0), 0);
  const servicesTotal = assessment.services.reduce((sum, s) => sum + (s.totalCost || 0), 0);
  const grandTotal = partsTotal + servicesTotal;

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
                (assessment.authorization?.assessmentStatus || assessment.status) as keyof typeof ASSESSMENT_STATUS_COLORS
              ]
            }
            variant="secondary"
          >
            {ASSESSMENT_STATUS_LABELS[
              (assessment.authorization?.assessmentStatus || assessment.status) as keyof typeof ASSESSMENT_STATUS_LABELS
            ]}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      {/* Claim / Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Claim & Insurance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Insured Name</p>
              <p className="font-medium">{assessment.claim?.insuredName || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Claim Number</p>
              <p className="font-medium">{assessment.claim?.claimNumber || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{assessment.claim?.insuredPhone || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{assessment.claim?.insuredEmail || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Insurance Company</p>
              <p className="font-medium">{assessment.insuranceCompany?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Policy Number</p>
              <p className="font-medium">{assessment.claim?.policyNumber || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Info */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {assessment.vehicle?.make && (
              <div>
                <p className="text-sm text-muted-foreground">Make</p>
                <p className="font-medium">{assessment.vehicle.make.name}</p>
              </div>
            )}
            {assessment.vehicle?.vehicleModel && (
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{assessment.vehicle.vehicleModel.name}</p>
              </div>
            )}
            {assessment.vehicle?.variant && (
              <div>
                <p className="text-sm text-muted-foreground">Variant</p>
                <p className="font-medium">{assessment.vehicle.variant.name}</p>
              </div>
            )}
            {assessment.vehicle?.yearOfManufacture && (
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{assessment.vehicle.yearOfManufacture}</p>
              </div>
            )}
            {assessment.vehicle?.colour && (
              <div>
                <p className="text-sm text-muted-foreground">Colour</p>
                <p className="font-medium">{assessment.vehicle.colour}</p>
              </div>
            )}
            {assessment.vehicle?.registrationNumber && (
              <div>
                <p className="text-sm text-muted-foreground">Registration</p>
                <p className="font-medium">{assessment.vehicle.registrationNumber}</p>
              </div>
            )}
            {assessment.vehicle?.vin && (
              <div>
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-medium">{assessment.vehicle.vin}</p>
              </div>
            )}
            {assessment.vehicle?.engineType && (
              <div>
                <p className="text-sm text-muted-foreground">Engine Type</p>
                <p className="font-medium">{assessment.vehicle.engineType}</p>
              </div>
            )}
            {assessment.vehicle?.mileage && (
              <div>
                <p className="text-sm text-muted-foreground">Mileage</p>
                <p className="font-medium">{assessment.vehicle.mileage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      {assessment.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Photos ({assessment.photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {assessment.photos.map((img) => (
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

      {/* Damage Items */}
      {assessment.damageItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Damage Assessment ({assessment.damageItems.length} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Part</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Accident</TableHead>
                  <TableHead>Pre-Accident</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessment.damageItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.damageArea || "—"}</TableCell>
                    <TableCell className="font-medium">{item.partName || "—"}</TableCell>
                    <TableCell>{item.actionRequired || "—"}</TableCell>
                    <TableCell>{item.accidentRelated ? "✓" : "—"}</TableCell>
                    <TableCell>{item.preAccidentDamage ? "✓" : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Parts */}
      {assessment.parts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Replacement Parts — {formatCurrency(partsTotal)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Part No.</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessment.parts.map((part, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{part.partName}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {part.partNumber || "—"}
                    </TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>{formatCurrency(part.unitPrice)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(part.totalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Services */}
      {assessment.services.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Labour & Services — {formatCurrency(servicesTotal)}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessment.services.map((svc, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{svc.description}</TableCell>
                    <TableCell>{svc.serviceType || "—"}</TableCell>
                    <TableCell>{svc.quantity}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(svc.totalCost)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Grand Total */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-2xl font-bold text-emerald-700">{formatCurrency(grandTotal)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Remarks */}
      {assessment.remark?.generalRemarks && (
        <Card>
          <CardHeader>
            <CardTitle>General Remarks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{assessment.remark.generalRemarks}</p>
          </CardContent>
        </Card>
      )}

      {/* Signatures */}
      {assessment.signatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {assessment.signatures.map((sig, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground uppercase">{sig.role}</p>
                  <p className="font-medium mt-1">{sig.name || "—"}</p>
                  {sig.organization && <p className="text-sm text-muted-foreground">{sig.organization}</p>}
                  {sig.phone && <p className="text-sm text-muted-foreground">{sig.phone}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
