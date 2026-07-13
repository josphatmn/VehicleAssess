"use client";

import { useCallback, useState } from "react";
import { useWizardStore } from "@/hooks/use-wizard-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload, X, GripVertical } from "lucide-react";

export function Step3UploadImages() {
  const { step3Files, setStep3Files, setStep } = useWizardStore();
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const validFiles = Array.from(newFiles).filter((f) =>
        ["image/jpeg", "image/png", "image/webp"].includes(f.type)
      );
      const combined = [...step3Files, ...validFiles].slice(0, 10);
      setStep3Files(combined);
    },
    [step3Files, setStep3Files]
  );

  const removeFile = (index: number) => {
    setStep3Files(step3Files.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>
          Upload accident photos (JPG, PNG, WEBP). Minimum 1, maximum 10 images.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }`}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop images here, or click to select
          </p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-primary hover:underline"
          >
            Browse files
          </label>
        </div>

        {step3Files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {step3Files.length} of 10 images selected
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {step3Files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative group"
                >
                  <div className="aspect-square rounded-md border overflow-hidden bg-muted">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <p className="text-xs mt-1 truncate text-muted-foreground">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button
            onClick={() => setStep(4)}
            disabled={step3Files.length === 0}
          >
            Next: AI Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
