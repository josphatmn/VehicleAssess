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

export function Step2VehicleInfo() {
  const { step2, updateStep2, setStep } = useWizardStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Information</CardTitle>
        <CardDescription>
          Enter the vehicle details from registration documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              value={step2.registrationNumber}
              onChange={(e) =>
                updateStep2({ registrationNumber: e.target.value })
              }
              placeholder="KAA 123A"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vin">VIN</Label>
            <Input
              id="vin"
              value={step2.vin}
              onChange={(e) => updateStep2({ vin: e.target.value })}
              placeholder="Vehicle Identification Number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="odometer">Odometer Reading</Label>
            <Input
              id="odometer"
              value={step2.odometer}
              onChange={(e) =>
                updateStep2({ odometer: e.target.value })
              }
              placeholder="e.g. 85,000 km"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleNotes">Notes</Label>
          <textarea
            id="vehicleNotes"
            value={step2.vehicleNotes}
            onChange={(e) =>
              updateStep2({ vehicleNotes: e.target.value })
            }
            placeholder="Additional vehicle information..."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={() => setStep(3)}>Next: Upload Images</Button>
        </div>
      </CardContent>
    </Card>
  );
}
