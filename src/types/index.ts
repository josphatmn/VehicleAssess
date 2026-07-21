export type UserRole = "ADMIN" | "ASSESSOR";

export type AssessmentStatusType =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "SUPPLEMENT_REQUIRED"
  | "COMPLETED"
  | "AI_ANALYZED"
  | "VERIFIED";

export type AuthorizationStatus = "Authorized" | "Not Authorized" | "Pending Authorization";
export type PartStatus = "Replace" | "Repair" | "Paint" | "Pending Confirmation";
export type DamageAction = "Replace" | "Repair" | "Paint" | "Polish" | "Inspect" | "No Action";
export type ServiceType = "Labour" | "Paint" | "Miscellaneous";
export type SignatureRole = "ASSESSOR" | "REPAIRER";

// ─── Fee Note ────────────────────────────────────────────────────────────────

export interface FeeNoteData {
  referenceNumber?: string;
  assessmentDate?: string;
  professionalFee: number;
  vat: number;
  reimbursement: number;
  totalProfessionalFee: number;
}

// ─── Claim Details ───────────────────────────────────────────────────────────

export interface ClaimData {
  claimNumber?: string;
  insuredName?: string;
  insuredPhone?: string;
  insuredEmail?: string;
  insuredAddress?: string;
  policyNumber?: string;
  sumInsured?: number;
  excessPercentage?: number;
  excessAmount?: number;
  dateOfInstruction?: string;
  dateOfAssessment?: string;
}

// ─── Vehicle Details ─────────────────────────────────────────────────────────

export interface VehicleData {
  registrationNumber?: string;
  makeId?: string;
  modelId?: string;
  variantId?: string;
  colour?: string;
  yearOfManufacture?: number;
  modeOfTransport?: string;
  engineType?: string;
  engineNumber?: string;
  chassisNumber?: string;
  vin?: string;
  mileage?: string;
  vehiclePopularity?: string;
  repairerName?: string;
}

// ─── Vehicle Condition ───────────────────────────────────────────────────────

export interface TyreConditionData {
  position: string;
  percentage: number;
}

export interface VehicleConditionData {
  overallCondition?: string;
  tyreBrand?: string;
  tyreSize?: string;
  spareTyreCondition?: string;
  mechanicalCondition?: string;
  interiorCondition?: string;
  exteriorCondition?: string;
  tyres: TyreConditionData[];
}

// ─── Accident Details ────────────────────────────────────────────────────────

export interface AccidentDetailData {
  accidentDate?: string;
  accidentLocation?: string;
  accidentDescription?: string;
  accidentCircumstances?: string;
  damageDescription?: string;
  insuredExplanation?: string;
  assessorObservation?: string;
  damageConsistentWithAccident?: boolean;
  damageConsistencyNote?: string;
}

// ─── Damage Assessment ───────────────────────────────────────────────────────

export interface DamageItemData {
  id?: string;
  damageArea?: string;
  partName?: string;
  side?: string;
  damageDescription?: string;
  actionRequired?: DamageAction;
  accidentRelated: boolean;
  preAccidentDamage: boolean;
  remarks?: string;
  sortOrder: number;
}

// ─── Parts Required ──────────────────────────────────────────────────────────

export interface PartData {
  id?: string;
  partName: string;
  partNumber?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  netPrice: number;
  vatPercent: number;
  vatAmount: number;
  totalPrice: number;
  partStatus?: PartStatus;
  remarks?: string;
  sortOrder: number;
}

// ─── Labour & Services ───────────────────────────────────────────────────────

export interface ServiceData {
  id?: string;
  description: string;
  quantity: number;
  unitCost: number;
  discount: number;
  vat: number;
  totalCost: number;
  serviceType?: ServiceType;
  remarks?: string;
  sortOrder: number;
}

// ─── Cost Summary (calculated) ───────────────────────────────────────────────

export interface CostSummary {
  partsGrossTotal: number;
  partsDiscount: number;
  partsNetTotal: number;
  labourTotal: number;
  paintTotal: number;
  miscellaneousTotal: number;
  servicesSubtotal: number;
  partsSubtotal: number;
  subtotalBeforeVat: number;
  vatAmount: number;
  grandTotal: number;
}

// ─── General Remarks ─────────────────────────────────────────────────────────

export interface RemarkData {
  generalRemarks?: string;
  partsToBeReplaced?: string;
  partsToBePainted?: string;
  partsRequiringRepair?: string;
  preAccidentDamage?: string;
  additionalObservations?: string;
}

// ─── Additional Damage Observations ──────────────────────────────────────────

export interface AdditionalObservationData {
  id?: string;
  damageDescription?: string;
  insuredExplanation?: string;
  assessorOpinion?: string;
  accidentRelated: boolean;
  estimatedRepairCost: number;
  estimatedPaintingCost: number;
  estimatedTotalCost: number;
  sortOrder: number;
}

// ─── Authorization ───────────────────────────────────────────────────────────

export interface AuthorizationData {
  authorized?: boolean;
  authorizationStatus?: AuthorizationStatus;
  copyToRepairer?: boolean;
  salvageValue?: number;
  preAccidentValue?: number;
  assessmentStatus?: AssessmentStatusType;
}

// ─── Special Instructions ────────────────────────────────────────────────────

export interface InstructionData {
  instruction: string;
  sortOrder: number;
}

// ─── Signature ───────────────────────────────────────────────────────────────

export interface SignatureData {
  role: SignatureRole;
  name?: string;
  licenseNumber?: string;
  organization?: string;
  phone?: string;
  email?: string;
  address?: string;
  signatureData?: string;
  signatureDate?: string;
}

// ─── Photo ───────────────────────────────────────────────────────────────────

export interface PhotoData {
  id?: string;
  filename: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
  sortOrder: number;
  caption?: string;
  damageItemId?: string;
}

// ─── Full Wizard Data ────────────────────────────────────────────────────────

export interface WizardData {
  feeNote: FeeNoteData;
  claim: ClaimData;
  vehicle: VehicleData;
  vehicleCondition: VehicleConditionData;
  accidentDetail: AccidentDetailData;
  damageItems: DamageItemData[];
  parts: PartData[];
  services: ServiceData[];
  remark: RemarkData;
  additionalObservations: AdditionalObservationData[];
  authorization: AuthorizationData;
  specialInstructions: InstructionData[];
  signatures: SignatureData[];
  photos: PhotoData[];
}

// ─── Assessment List Item ────────────────────────────────────────────────────

export interface AssessmentListItem {
  id: string;
  assessmentNumber: string;
  status: AssessmentStatusType;
  insuredName: string | null;
  registrationNumber: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  insuranceCompany: string | null;
  grandTotal: number;
  paid: boolean;
  createdAt: string;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export interface DashboardStats {
  totalAssessments: number;
  pendingVerification: number;
  completedAssessments: number;
  paidCount: number;
  totalRevenue: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const DAMAGE_ACTIONS: DamageAction[] = [
  "Replace", "Repair", "Paint", "Polish", "Inspect", "No Action",
];

export const PART_STATUSES: PartStatus[] = [
  "Replace", "Repair", "Paint", "Pending Confirmation",
];

export const SERVICE_TYPES: ServiceType[] = [
  "Labour", "Paint", "Miscellaneous",
];

export const ASSESSMENT_STATUS_LABELS: Record<AssessmentStatusType, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  SUPPLEMENT_REQUIRED: "Supplement Required",
  COMPLETED: "Completed",
  AI_ANALYZED: "AI Analyzed",
  VERIFIED: "Verified",
};

export const ASSESSMENT_STATUS_COLORS: Record<AssessmentStatusType, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  SUPPLEMENT_REQUIRED: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  AI_ANALYZED: "bg-purple-100 text-purple-800",
  VERIFIED: "bg-indigo-100 text-indigo-800",
};

export const AUTHORIZATION_STATUS_OPTIONS: AuthorizationStatus[] = [
  "Authorized", "Not Authorized", "Pending Authorization",
];

export const TYRE_POSITIONS = ["RHF", "RHR", "LHF", "LHR"] as const;

export type PartCategoryOption = { value: string; label: string };

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
  { value: "LIGHTING", label: "Lighting" },
  { value: "STRUCTURAL", label: "Structural" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export const DEFAULT_SPECIAL_INSTRUCTIONS: string[] = [
  "Estimate is limited to accident-related damage only.",
  "Any additional damage discovered during repairs requires supplementary authorization.",
  "The vehicle should not be released without insurer authorization.",
  "Re-inspection may be required after repairs.",
  "Removed replacement parts should be retained for insurer collection.",
  "The repairer must notify the assessor or insurer when additional damage is discovered.",
];

// ─── Utility: compute cost summary ───────────────────────────────────────────

export function computeCostSummary(parts: PartData[], services: ServiceData[]): CostSummary {
  const partsGrossTotal = parts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  const partsDiscount = parts.reduce((sum, p) => sum + p.discountAmount, 0);
  const partsNetTotal = parts.reduce((sum, p) => sum + p.netPrice, 0);

  const labourTotal = services.filter((s) => s.serviceType === "Labour").reduce((sum, s) => sum + s.totalCost, 0);
  const paintTotal = services.filter((s) => s.serviceType === "Paint").reduce((sum, s) => sum + s.totalCost, 0);
  const miscellaneousTotal = services.filter((s) => s.serviceType === "Miscellaneous").reduce((sum, s) => sum + s.totalCost, 0);
  const servicesSubtotal = services.reduce((sum, s) => sum + s.totalCost, 0);

  const partsSubtotal = partsNetTotal;
  const subtotalBeforeVat = partsSubtotal + servicesSubtotal;
  const vatAmount = subtotalBeforeVat * 0.16;
  const grandTotal = subtotalBeforeVat + vatAmount;

  return {
    partsGrossTotal,
    partsDiscount,
    partsNetTotal,
    labourTotal,
    paintTotal,
    miscellaneousTotal,
    servicesSubtotal,
    partsSubtotal,
    subtotalBeforeVat,
    vatAmount,
    grandTotal,
  };
}

// ─── Utility: compute part totals ────────────────────────────────────────────

export function computePartTotals(part: PartData): PartData {
  const lineTotal = part.quantity * part.unitPrice;
  const discountAmount = lineTotal * (part.discountPercent / 100);
  const netPrice = lineTotal - discountAmount;
  const vatAmount = netPrice * (part.vatPercent / 100);
  const totalPrice = netPrice + vatAmount;
  return { ...part, discountAmount, netPrice, vatAmount, totalPrice };
}

// ─── Utility: compute service totals ─────────────────────────────────────────

export function computeServiceTotals(service: ServiceData): ServiceData {
  const lineTotal = service.quantity * service.unitCost;
  const afterDiscount = lineTotal - service.discount;
  const vat = afterDiscount * 0.16;
  const totalCost = afterDiscount + vat;
  return { ...service, vat, totalCost };
}
