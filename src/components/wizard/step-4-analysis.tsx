"use client";

import { useState } from "react";
import { useWizardStore } from "@/hooks/use-wizard-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import {
  createAssessment,
  saveAssessmentImages,
  saveAIResults,
} from "@/actions/assessments";
import type { AIAnalysisResult } from "@/lib/openrouter";

interface UploadedFile {
  filename: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function Step4AIAnalysis() {
  const wizard = useWizardStore();
  const [status, setStatus] = useState<
    "idle" | "creating" | "uploading" | "analyzing" | "done" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const runAnalysis = async () => {
    setStatus("creating");
    setProgress("Creating assessment...");

    try {
      const assessment = await createAssessment({
        customerName: wizard.step1.customerName,
        customerPhone: wizard.step1.customerPhone,
        customerEmail: wizard.step1.customerEmail,
        insuranceCompany: wizard.step1.insuranceCompany,
        claimNumber: wizard.step1.claimNumber,
        registrationNumber: wizard.step2.registrationNumber,
        vin: wizard.step2.vin,
        odometer: wizard.step2.odometer,
        vehicleNotes: wizard.step2.vehicleNotes,
      });

      wizard.setAssessmentId(assessment.id);

      setStatus("uploading");
      setProgress("Uploading images...");

      const formData = new FormData();
      for (const file of wizard.step3Files) {
        formData.append("files", file);
      }

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const { files: uploadedFiles } = await uploadRes.json();

      const dbImages: (UploadedFile & { sortOrder: number })[] = uploadedFiles.map(
        (
          f: UploadedFile,
          i: number
        ) => ({
          filename: f.filename,
          originalName: f.originalName,
          path: f.path,
          mimeType: f.mimeType,
          size: f.size,
          sortOrder: i,
        })
      );

      await saveAssessmentImages(assessment.id, dbImages);

      wizard.setUploadedImages(
        dbImages.map((img) => ({
          id: img.filename,
          filename: img.filename,
          originalName: img.originalName,
          path: img.path,
        }))
      );

      setProgress("Converting images...");
      const base64Images: string[] = [];
      for (const file of wizard.step3Files) {
        base64Images.push(await fileToBase64(file));
      }

      setStatus("analyzing");
      setProgress("AI is analyzing images...");

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: base64Images }),
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || "AI analysis failed");
      }

      const aiResult: AIAnalysisResult = await analyzeResponse.json();

      await saveAIResults(assessment.id, aiResult);

      wizard.setAiResult(aiResult);

      wizard.setVerifiedVehicle({
        make: aiResult.vehicle.make,
        model: aiResult.vehicle.model,
        variant: aiResult.vehicle.variant,
        year: aiResult.vehicle.year,
        bodyType: aiResult.vehicle.body_type,
        color: aiResult.vehicle.color,
        confidence: aiResult.vehicle.confidence,
      });

      wizard.setVerifiedDamage({
        severity: aiResult.damage.severity,
        summary: aiResult.damage.summary,
        structuralDamage: aiResult.damage.structural_damage,
        rollover: aiResult.damage.rollover,
        possibleTotalLoss: aiResult.damage.possible_total_loss,
      });

      wizard.setDamagedParts(
        aiResult.replacement_parts.map((part) => ({
          name: part.partName,
          severity: part.damageSeverity || "",
          confirmed: false,
        }))
      );

      wizard.setReplacementParts(
        aiResult.replacement_parts.map((part) => ({
          partName: part.partName,
          partNumber: "",
          quantity: typeof part.estimatedQuantity === "number" ? part.estimatedQuantity : 1,
          unitPrice: 0,
          subtotal: 0,
          confirmed: false,
        }))
      );

      wizard.setInspectionItems([]);

      wizard.setRepairRecommendation(aiResult.damage.summary);

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis</CardTitle>
        <CardDescription>
          The AI will analyze the uploaded images to detect vehicle details and
          damage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "idle" && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Click the button below to start the AI analysis of your uploaded
              images.
            </p>
            <Button onClick={runAnalysis} size="lg">
              Start AI Analysis
            </Button>
          </div>
        )}

        {(status === "creating" ||
          status === "uploading" ||
          status === "analyzing") && (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">{progress}</p>
            <p className="text-sm text-muted-foreground mt-2">
              This may take a moment...
            </p>
          </div>
        )}

        {status === "done" && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Analysis Complete!</p>
            <p className="text-sm text-muted-foreground mb-6">
              The AI has detected vehicle information and damage. Please proceed
              to verify and edit the results.
            </p>
            <Button onClick={() => wizard.setStep(5)} size="lg">
              Next: Verify Results
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Analysis Failed</p>
            <p className="text-sm text-destructive mb-4">{error}</p>
            <Button onClick={runAnalysis} variant="outline">
              Retry Analysis
            </Button>
          </div>
        )}

        {status !== "idle" && (
          <div className="flex justify-start pt-4">
            <Button variant="outline" onClick={() => wizard.setStep(3)}>
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
