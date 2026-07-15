"use client";

import { useState } from "react";
import { useWizardStore } from "@/hooks/use-wizard-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X, Plus, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

export function Step5Verify() {
  const {
    verifiedVehicle,
    setVerifiedVehicle,
    verifiedDamage,
    setVerifiedDamage,
    damagedParts,
    setDamagedParts,
    replacementParts,
    setReplacementParts,
    inspectionItems,
    setInspectionItems,
    repairRecommendation,
    setRepairRecommendation,
    setStep,
  } = useWizardStore();

  const [newPartName, setNewPartName] = useState("");
  const [newPartSeverity, setNewPartSeverity] = useState("");
  const [newReplacementPart, setNewReplacementPart] = useState("");
  const [newReplacementQty, setNewReplacementQty] = useState(1);
  const [newReplacementPrice, setNewReplacementPrice] = useState(0);
  const [newInspectionItem, setNewInspectionItem] = useState("");

  const totalReplacementCost = replacementParts.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );

  const allPartsConfirmed = damagedParts.every((p) => p.confirmed);

  return (
    <div className="space-y-6">
      <AlertCard />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Vehicle Details
            {verifiedVehicle.confidence > 0 && (
              <Badge variant="secondary">
                AI Confidence: {verifiedVehicle.confidence}%
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Make</Label>
              <Input
                value={verifiedVehicle.make}
                onChange={(e) =>
                  setVerifiedVehicle({ make: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={verifiedVehicle.model}
                onChange={(e) =>
                  setVerifiedVehicle({ model: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Input
                value={verifiedVehicle.variant}
                onChange={(e) =>
                  setVerifiedVehicle({ variant: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={verifiedVehicle.year}
                onChange={(e) =>
                  setVerifiedVehicle({ year: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Body Type</Label>
              <Input
                value={verifiedVehicle.bodyType}
                onChange={(e) =>
                  setVerifiedVehicle({ bodyType: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <Input
                value={verifiedVehicle.color}
                onChange={(e) =>
                  setVerifiedVehicle({ color: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Damage Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Severity</Label>
              <Input
                value={verifiedDamage.severity}
                onChange={(e) =>
                  setVerifiedDamage({ severity: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="structural"
                  checked={verifiedDamage.structuralDamage}
                  onCheckedChange={(checked) =>
                    setVerifiedDamage({
                      structuralDamage: checked === true,
                    })
                  }
                />
                <Label htmlFor="structural">Structural Damage</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rollover"
                  checked={verifiedDamage.rollover}
                  onCheckedChange={(checked) =>
                    setVerifiedDamage({ rollover: checked === true })
                  }
                />
                <Label htmlFor="rollover">Rollover</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="totalLoss"
                  checked={verifiedDamage.possibleTotalLoss}
                  onCheckedChange={(checked) =>
                    setVerifiedDamage({
                      possibleTotalLoss: checked === true,
                    })
                  }
                />
                <Label htmlFor="totalLoss">Possible Total Loss</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Damage Description</Label>
            <textarea
              value={verifiedDamage.summary}
              onChange={(e) =>
                setVerifiedDamage({ summary: e.target.value })
              }
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Damaged Parts ({damagedParts.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {damagedParts.map((part, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-md border"
            >
              <Checkbox
                checked={part.confirmed}
                onCheckedChange={(checked) => {
                  const updated = [...damagedParts];
                  updated[index].confirmed = checked === true;
                  setDamagedParts(updated);
                }}
              />
              <Input
                value={part.name}
                onChange={(e) => {
                  const updated = [...damagedParts];
                  updated[index].name = e.target.value;
                  setDamagedParts(updated);
                }}
                className="flex-1"
              />
              <Input
                value={part.severity}
                onChange={(e) => {
                  const updated = [...damagedParts];
                  updated[index].severity = e.target.value;
                  setDamagedParts(updated);
                }}
                placeholder="Severity"
                className="w-32"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setDamagedParts(
                    damagedParts.filter((_, i) => i !== index)
                  )
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newPartName}
              onChange={(e) => setNewPartName(e.target.value)}
              placeholder="Part name"
              className="flex-1"
            />
            <Input
              value={newPartSeverity}
              onChange={(e) => setNewPartSeverity(e.target.value)}
              placeholder="Severity"
              className="w-32"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (newPartName) {
                  setDamagedParts([
                    ...damagedParts,
                    {
                      name: newPartName,
                      severity: newPartSeverity,
                      confirmed: false,
                    },
                  ]);
                  setNewPartName("");
                  setNewPartSeverity("");
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Part
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Replacement Parts (Total: {formatCurrency(totalReplacementCost)})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part Name</TableHead>
                <TableHead>Part Number</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {replacementParts.map((part, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={part.partName}
                      onChange={(e) => {
                        const updated = [...replacementParts];
                        updated[index].partName = e.target.value;
                        setReplacementParts(updated);
                      }}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={part.partNumber}
                      onChange={(e) => {
                        const updated = [...replacementParts];
                        updated[index].partNumber = e.target.value;
                        setReplacementParts(updated);
                      }}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={part.quantity}
                      onChange={(e) => {
                        const updated = [...replacementParts];
                        updated[index].quantity = parseInt(e.target.value) || 1;
                        updated[index].subtotal =
                          updated[index].quantity * updated[index].unitPrice;
                        setReplacementParts(updated);
                      }}
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={part.unitPrice}
                      onChange={(e) => {
                        const updated = [...replacementParts];
                        updated[index].unitPrice =
                          parseFloat(e.target.value) || 0;
                        updated[index].subtotal =
                          updated[index].quantity * updated[index].unitPrice;
                        setReplacementParts(updated);
                      }}
                      className="h-8 w-24"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(part.quantity * part.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setReplacementParts(
                          replacementParts.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center gap-2">
            <Input
              value={newReplacementPart}
              onChange={(e) => setNewReplacementPart(e.target.value)}
              placeholder="Part name"
              className="flex-1"
            />
            <Input
              type="number"
              value={newReplacementQty}
              onChange={(e) =>
                setNewReplacementQty(parseInt(e.target.value) || 1)
              }
              placeholder="Qty"
              className="w-20"
            />
            <Input
              type="number"
              value={newReplacementPrice}
              onChange={(e) =>
                setNewReplacementPrice(parseFloat(e.target.value) || 0)
              }
              placeholder="Price"
              className="w-24"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (newReplacementPart) {
                  setReplacementParts([
                    ...replacementParts,
                    {
                      partName: newReplacementPart,
                      partNumber: "",
                      quantity: newReplacementQty,
                      unitPrice: newReplacementPrice,
                      subtotal: newReplacementQty * newReplacementPrice,
                      confirmed: false,
                    },
                  ]);
                  setNewReplacementPart("");
                  setNewReplacementQty(1);
                  setNewReplacementPrice(0);
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Part
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inspection Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inspectionItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-md border"
            >
              <Checkbox
                checked={item.completed}
                onCheckedChange={(checked) => {
                  const updated = [...inspectionItems];
                  updated[index].completed = checked === true;
                  setInspectionItems(updated);
                }}
              />
              <Input
                value={item.item}
                onChange={(e) => {
                  const updated = [...inspectionItems];
                  updated[index].item = e.target.value;
                  setInspectionItems(updated);
                }}
                className="flex-1"
              />
              <Input
                value={item.notes}
                onChange={(e) => {
                  const updated = [...inspectionItems];
                  updated[index].notes = e.target.value;
                  setInspectionItems(updated);
                }}
                placeholder="Notes"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setInspectionItems(
                    inspectionItems.filter((_, i) => i !== index)
                  )
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newInspectionItem}
              onChange={(e) => setNewInspectionItem(e.target.value)}
              placeholder="Inspection item"
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (newInspectionItem) {
                  setInspectionItems([
                    ...inspectionItems,
                    { item: newInspectionItem, notes: "", completed: false },
                  ]);
                  setNewInspectionItem("");
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repair Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={repairRecommendation}
            onChange={(e) => setRepairRecommendation(e.target.value)}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(4)}>
          Back
        </Button>
        <Button onClick={() => setStep(6)}>Next: Review Summary</Button>
      </div>
    </div>
  );
}

function AlertCard() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
      <div>
        <p className="font-medium text-yellow-800">
          Manual Verification Required
        </p>
        <p className="text-sm text-yellow-700">
          AI results are suggestions only. You must manually verify and edit all
          vehicle details, damage information, and parts before proceeding.
        </p>
      </div>
    </div>
  );
}
