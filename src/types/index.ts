export type UserRole = "ADMIN" | "ASSESSOR";

export type AssessmentStatusType =
  | "DRAFT"
  | "AI_ANALYZED"
  | "AWAITING_VERIFICATION"
  | "VERIFIED"
  | "COMPLETED";

export interface WizardData {
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
  step3: {
    files: File[];
  };
  step4: {
    aiResult: import("@/lib/openrouter").AIAnalysisResult | null;
  };
  step5: {
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
    damagedParts: { name: string; severity: string; confirmed: boolean }[];
    replacementParts: {
      partName: string;
      partNumber: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
      confirmed: boolean;
      vehiclePartId?: string;
    }[];
    inspectionItems: { item: string; notes: string; completed: boolean }[];
    repairRecommendation: string;
  };
}

export interface DashboardStats {
  totalAssessments: number;
  pendingVerification: number;
  completedAssessments: number;
  paidCount: number;
  totalRevenue: number;
}

export interface AssessmentListItem {
  id: string;
  assessmentNumber: string;
  customerName: string;
  status: AssessmentStatusType;
  registrationNumber: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  createdAt: string;
}

export interface PartCategoryOption {
  value: string;
  label: string;
}

export const PART_CATEGORIES: PartCategoryOption[] = [
  { value: "ENGINE", label: "Engine" },
  { value: "SUSPENSION", label: "Suspension" },
  { value: "STEERING", label: "Steering" },
  { value: "COOLING", label: "Cooling" },
  { value: "BODY", label: "Body" },
  { value: "CHASSIS", label: "Chassis" },
  { value: "INTERIOR", label: "Interior" },
  { value: "EXTERIOR", label: "Exterior" },
  { value: "ELECTRICAL", label: "Electrical" },
  { value: "SAFETY", label: "Safety" },
  { value: "GLASS", label: "Glass" },
  { value: "WHEELS", label: "Wheels" },
];

export const ASSESSMENT_STATUS_LABELS: Record<AssessmentStatusType, string> = {
  DRAFT: "Draft",
  AI_ANALYZED: "AI Analyzed",
  AWAITING_VERIFICATION: "Awaiting Verification",
  VERIFIED: "Verified",
  COMPLETED: "Completed",
};

export const ASSESSMENT_STATUS_COLORS: Record<AssessmentStatusType, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  AI_ANALYZED: "bg-blue-100 text-blue-800",
  AWAITING_VERIFICATION: "bg-yellow-100 text-yellow-800",
  VERIFIED: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
};
