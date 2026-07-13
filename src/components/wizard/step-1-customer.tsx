"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Step1CustomerInfo() {
  const { step1, updateStep1, setStep } = useWizardStore();

  const canProceed =
    step1.customerName &&
    step1.customerPhone &&
    step1.customerEmail;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>
          Enter the customer and insurance claim details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              value={step1.customerName}
              onChange={(e) =>
                updateStep1({ customerName: e.target.value })
              }
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Phone *</Label>
            <Input
              id="customerPhone"
              value={step1.customerPhone}
              onChange={(e) =>
                updateStep1({ customerPhone: e.target.value })
              }
              placeholder="+254 700 000 000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={step1.customerEmail}
              onChange={(e) =>
                updateStep1({ customerEmail: e.target.value })
              }
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insuranceCompany">Insurance Company</Label>
            <Input
              id="insuranceCompany"
              value={step1.insuranceCompany}
              onChange={(e) =>
                updateStep1({ insuranceCompany: e.target.value })
              }
              placeholder="Insurance Company Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimNumber">Claim Number</Label>
            <Input
              id="claimNumber"
              value={step1.claimNumber}
              onChange={(e) =>
                updateStep1({ claimNumber: e.target.value })
              }
              placeholder="CLM-2026-001"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setStep(2)} disabled={!canProceed}>
            Next: Vehicle Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
