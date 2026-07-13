import { create } from "zustand";
import type { AIAnalysisResult } from "@/lib/openrouter";

interface DamagedPart {
  name: string;
  severity: string;
  confirmed: boolean;
}

interface ReplacementPart {
  partName: string;
  partNumber: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  confirmed: boolean;
  vehiclePartId?: string;
}

interface InspectionItem {
  item: string;
  notes: string;
  completed: boolean;
}

interface WizardState {
  currentStep: number;
  assessmentId: string | null;

  step1: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    insuranceCompany: string;
    claimNumber: string;
  };
  step2: {
    registrationNumber: string;
    vin: string;
    odometer: string;
    vehicleNotes: string;
  };
  step3Files: File[];
  uploadedImages: {
    id: string;
    filename: string;
    originalName: string;
    path: string;
  }[];

  aiResult: AIAnalysisResult | null;

  verifiedVehicle: {
    make: string;
    model: string;
    variant: string;
    year: string;
    bodyType: string;
    color: string;
    confidence: number;
  };
  verifiedDamage: {
    severity: string;
    summary: string;
    structuralDamage: boolean;
    rollover: boolean;
    possibleTotalLoss: boolean;
  };
  damagedParts: DamagedPart[];
  replacementParts: ReplacementPart[];
  inspectionItems: InspectionItem[];
  repairRecommendation: string;

  setStep: (step: number) => void;
  setAssessmentId: (id: string) => void;
  updateStep1: (data: Partial<WizardState["step1"]>) => void;
  updateStep2: (data: Partial<WizardState["step2"]>) => void;
  setStep3Files: (files: File[]) => void;
  setUploadedImages: (
    images: { id: string; filename: string; originalName: string; path: string }[]
  ) => void;
  setAiResult: (result: AIAnalysisResult) => void;
  setVerifiedVehicle: (data: Partial<WizardState["verifiedVehicle"]>) => void;
  setVerifiedDamage: (data: Partial<WizardState["verifiedDamage"]>) => void;
  setDamagedParts: (parts: DamagedPart[]) => void;
  setReplacementParts: (parts: ReplacementPart[]) => void;
  setInspectionItems: (items: InspectionItem[]) => void;
  setRepairRecommendation: (text: string) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  assessmentId: null,
  step1: {
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    insuranceCompany: "",
    claimNumber: "",
  },
  step2: {
    registrationNumber: "",
    vin: "",
    odometer: "",
    vehicleNotes: "",
  },
  step3Files: [],
  uploadedImages: [],
  aiResult: null,
  verifiedVehicle: {
    make: "",
    model: "",
    variant: "",
    year: "",
    bodyType: "",
    color: "",
    confidence: 0,
  },
  verifiedDamage: {
    severity: "",
    summary: "",
    structuralDamage: false,
    rollover: false,
    possibleTotalLoss: false,
  },
  damagedParts: [],
  replacementParts: [],
  inspectionItems: [],
  repairRecommendation: "",
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  setAssessmentId: (id) => set({ assessmentId: id }),
  updateStep1: (data) =>
    set((state) => ({ step1: { ...state.step1, ...data } })),
  updateStep2: (data) =>
    set((state) => ({ step2: { ...state.step2, ...data } })),
  setStep3Files: (files) => set({ step3Files: files }),
  setUploadedImages: (images) => set({ uploadedImages: images }),
  setAiResult: (result) => set({ aiResult: result }),
  setVerifiedVehicle: (data) =>
    set((state) => ({ verifiedVehicle: { ...state.verifiedVehicle, ...data } })),
  setVerifiedDamage: (data) =>
    set((state) => ({ verifiedDamage: { ...state.verifiedDamage, ...data } })),
  setDamagedParts: (parts) => set({ damagedParts: parts }),
  setReplacementParts: (parts) => set({ replacementParts: parts }),
  setInspectionItems: (items) => set({ inspectionItems: items }),
  setRepairRecommendation: (text) => set({ repairRecommendation: text }),
  reset: () => set(initialState),
}));
