"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/hooks/use-wizard-store";
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
  saveVerifiedAssessment,
  completeAssessment,
} from "@/actions/assessments";
import { toast } from "sonner";
import { Loader2, Printer } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

export function Step6Summary() {
  const router = useRouter();
  const wizard = useWizardStore();
  const [saving, setSaving] = useState(false);

  const totalCost = wizard.replacementParts.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );

  const handleSave = async () => {
    if (!wizard.assessmentId) return;

    setSaving(true);
    try {
      await saveVerifiedAssessment(wizard.assessmentId, {
        vehicle: wizard.verifiedVehicle,
        damage: wizard.verifiedDamage,
        damagedParts: wizard.damagedParts,
        replacementParts: wizard.replacementParts,
        inspectionItems: wizard.inspectionItems,
        repairRecommendation: wizard.repairRecommendation,
      });

      await completeAssessment(wizard.assessmentId);

      toast.success("Assessment saved successfully!");
      wizard.reset();
      router.push("/dashboard");
    } catch {
      toast.error("Failed to save assessment");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Customer Name</p>
              <p className="font-medium">{wizard.step1.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{wizard.step1.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{wizard.step1.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Insurance Company
              </p>
              <p className="font-medium">{wizard.step1.insuranceCompany}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Claim Number</p>
              <p className="font-medium">{wizard.step1.claimNumber}</p>
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
            <div>
              <p className="text-sm text-muted-foreground">Make</p>
              <p className="font-medium">{wizard.verifiedVehicle.make}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{wizard.verifiedVehicle.model}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Variant</p>
              <p className="font-medium">
                {wizard.verifiedVehicle.variant || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{wizard.verifiedVehicle.year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Body Type</p>
              <p className="font-medium">{wizard.verifiedVehicle.bodyType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Color</p>
              <p className="font-medium">{wizard.verifiedVehicle.color}</p>
            </div>
            {wizard.step2.registrationNumber && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Registration Number
                </p>
                <p className="font-medium">
                  {wizard.step2.registrationNumber}
                </p>
              </div>
            )}
            {wizard.step2.vin && (
              <div>
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-medium">{wizard.step2.vin}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {wizard.uploadedImages.map((img) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Damage Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Severity</p>
              <Badge variant="secondary">{wizard.verifiedDamage.severity}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Structural Damage</p>
              <p className="font-medium">
                {wizard.verifiedDamage.structuralDamage ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Possible Total Loss</p>
              <p className="font-medium">
                {wizard.verifiedDamage.possibleTotalLoss ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Damage Description
            </p>
            <p>{wizard.verifiedDamage.summary}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Damaged Parts ({wizard.damagedParts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {wizard.damagedParts.map((part, i) => (
              <Badge key={i} variant="outline">
                {part.name}
                {part.severity && ` (${part.severity})`}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Replacement Parts - Estimated Cost: {formatCurrency(totalCost)}
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
              {wizard.replacementParts.map((part, i) => (
                <TableRow key={i}>
                  <TableCell>{part.partName}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {part.partNumber || "-"}
                  </TableCell>
                  <TableCell>{part.quantity}</TableCell>
                  <TableCell>{formatCurrency(part.unitPrice)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(part.quantity * part.unitPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {wizard.inspectionItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Inspection Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {wizard.inspectionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
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

      {wizard.repairRecommendation && (
        <Card>
          <CardHeader>
            <CardTitle>Repair Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{wizard.repairRecommendation}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between print:hidden">
        <Button variant="outline" onClick={() => wizard.setStep(5)}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            Save Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}
