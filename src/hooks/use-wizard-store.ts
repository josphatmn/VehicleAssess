import { create } from "zustand";
import {
  type FeeNoteData,
  type ClaimData,
  type VehicleData,
  type VehicleConditionData,
  type TyreConditionData,
  type AccidentDetailData,
  type DamageItemData,
  type PartData,
  type ServiceData,
  type RemarkData,
  type AdditionalObservationData,
  type AuthorizationData,
  type InstructionData,
  type SignatureData,
  type PhotoData,
  computePartTotals,
  computeServiceTotals,
  computeCostSummary,
  DEFAULT_SPECIAL_INSTRUCTIONS,
} from "@/types";

type Step =
  | "upload"
  | "analyze"
  | "payment"
  | "intake"
  | "vehicle"
  | "condition"
  | "damage"
  | "estimate"
  | "remarks"
  | "authorization"
  | "results";

const STEP_PARAM: Record<Step, string> = {
  upload: "upload",
  analyze: "analyze",
  payment: "payment",
  intake: "intake",
  vehicle: "vehicle",
  condition: "condition",
  damage: "damage",
  estimate: "estimate",
  remarks: "remarks",
  authorization: "authorization",
  results: "results",
};

const PARAM_TO_STEP: Record<string, Step> = Object.fromEntries(
  Object.entries(STEP_PARAM).map(([k, v]) => [v, k as Step])
);

interface WizardState {
  step: Step;
  assessmentId: string | null;

  // Core assessment fields (FK on Assessment model)
  insuranceCompanyId: string | null;
  repairerId: string | null;

  // Section 1: Fee Note
  feeNote: FeeNoteData;
  // Section 3: Claim
  claim: ClaimData;
  // Section 4: Vehicle
  vehicle: VehicleData;
  // Section 5: Vehicle Condition
  vehicleCondition: VehicleConditionData;
  // Section 6: Accident
  accidentDetail: AccidentDetailData;
  // Section 7: Damage Items
  damageItems: DamageItemData[];
  // Section 8: Parts
  parts: PartData[];
  // Section 9: Services
  services: ServiceData[];
  // Section 11: Remarks
  remark: RemarkData;
  // Section 12: Additional Observations
  additionalObservations: AdditionalObservationData[];
  // Section 13: Authorization
  authorization: AuthorizationData;
  // Section 15: Special Instructions
  specialInstructions: InstructionData[];
  // Section 16: Signatures
  signatures: SignatureData[];
  // Photos
  photos: PhotoData[];
  files: File[];
  previews: string[];

  // UI state
  analyzing: boolean;
  result: unknown | null;
  saving: boolean;
  paying: boolean;
  paid: boolean;
  downloadingPdf: boolean;

  // Actions
  setStep: (step: Step) => void;
  setAssessmentId: (id: string) => void;
  setInsuranceCompanyId: (id: string | null) => void;
  setRepairerId: (id: string | null) => void;
  updateFeeNote: (data: Partial<FeeNoteData>) => void;
  updateClaim: (data: Partial<ClaimData>) => void;
  updateVehicle: (data: Partial<VehicleData>) => void;
  updateVehicleCondition: (data: Partial<Omit<VehicleConditionData, "tyres"> & { tyres?: TyreConditionData[] }>) => void;
  updateAccidentDetail: (data: Partial<AccidentDetailData>) => void;
  setDamageItems: (items: DamageItemData[]) => void;
  updateDamageItem: (index: number, data: Partial<DamageItemData>) => void;
  addDamageItem: () => void;
  removeDamageItem: (index: number) => void;
  setParts: (parts: PartData[]) => void;
  updatePart: (index: number, data: Partial<PartData>) => void;
  addPart: () => void;
  removePart: (index: number) => void;
  setServices: (services: ServiceData[]) => void;
  updateService: (index: number, data: Partial<ServiceData>) => void;
  addService: () => void;
  removeService: (index: number) => void;
  updateRemark: (data: Partial<RemarkData>) => void;
  setAdditionalObservations: (obs: AdditionalObservationData[]) => void;
  addAdditionalObservation: () => void;
  removeAdditionalObservation: (index: number) => void;
  updateAuthorization: (data: Partial<AuthorizationData>) => void;
  setSpecialInstructions: (instructions: InstructionData[]) => void;
  addSpecialInstruction: (text: string) => void;
  removeSpecialInstruction: (index: number) => void;
  setSignatures: (sigs: SignatureData[]) => void;
  updateSignature: (index: number, data: Partial<SignatureData>) => void;
  addSignature: (role: "ASSESSOR" | "REPAIRER") => void;
  removeSignature: (index: number) => void;
  setPhotos: (photos: PhotoData[]) => void;
  addPhoto: (photo: PhotoData) => void;
  removePhoto: (index: number) => void;
  setFiles: (files: File[]) => void;
  setPreviews: (previews: string[]) => void;
  setAnalyzing: (v: boolean) => void;
  setResult: (r: unknown | null) => void;
  setSaving: (v: boolean) => void;
  setPaying: (v: boolean) => void;
  setPaid: (v: boolean) => void;
  setDownloadingPdf: (v: boolean) => void;
  loadAssessment: (data: Record<string, unknown>) => void;
  reset: () => void;

  // Computed
  getCostSummary: () => ReturnType<typeof computeCostSummary>;
}

const initialState = {
  step: "upload" as Step,
  assessmentId: null as string | null,
  insuranceCompanyId: null as string | null,
  repairerId: null as string | null,
  feeNote: {
    referenceNumber: "",
    assessmentDate: new Date().toISOString().split("T")[0],
    professionalFee: 0,
    vat: 0,
    reimbursement: 0,
    totalProfessionalFee: 0,
  } as FeeNoteData,
  claim: {
    claimNumber: "",
    insuredName: "",
    insuredPhone: "",
    insuredEmail: "",
    insuredAddress: "",
    policyNumber: "",
    sumInsured: undefined,
    excessPercentage: undefined,
    excessAmount: undefined,
    dateOfInstruction: undefined,
    dateOfAssessment: undefined,
  } as ClaimData,
  vehicle: {
    registrationNumber: "",
    makeId: undefined,
    modelId: undefined,
    variantId: undefined,
    colour: "",
    yearOfManufacture: undefined,
    modeOfTransport: "",
    engineType: "",
    engineNumber: "",
    chassisNumber: "",
    vin: "",
    mileage: "",
    vehiclePopularity: "",
    repairerName: "",
  } as VehicleData,
  vehicleCondition: {
    overallCondition: "",
    tyreBrand: "",
    tyreSize: "",
    spareTyreCondition: "",
    mechanicalCondition: "",
    interiorCondition: "",
    exteriorCondition: "",
    tyres: [
      { position: "RHF", percentage: 0 },
      { position: "RHR", percentage: 0 },
      { position: "LHF", percentage: 0 },
      { position: "LHR", percentage: 0 },
    ],
  } as VehicleConditionData,
  accidentDetail: {
    accidentDate: undefined,
    accidentLocation: "",
    accidentDescription: "",
    accidentCircumstances: "",
    damageDescription: "",
    insuredExplanation: "",
    assessorObservation: "",
    damageConsistentWithAccident: true,
    damageConsistencyNote: "",
  } as AccidentDetailData,
  damageItems: [] as DamageItemData[],
  parts: [] as PartData[],
  services: [] as ServiceData[],
  remark: {
    generalRemarks: "",
    partsToBeReplaced: "",
    partsToBePainted: "",
    partsRequiringRepair: "",
    preAccidentDamage: "",
    additionalObservations: "",
  } as RemarkData,
  additionalObservations: [] as AdditionalObservationData[],
  authorization: {
    authorized: false,
    authorizationStatus: "Pending Authorization",
    copyToRepairer: false,
    salvageValue: undefined,
    preAccidentValue: undefined,
    assessmentStatus: "DRAFT",
  } as AuthorizationData,
  specialInstructions: DEFAULT_SPECIAL_INSTRUCTIONS.map((instruction, sortOrder) => ({
    instruction,
    sortOrder,
  })) as InstructionData[],
  signatures: [] as SignatureData[],
  photos: [] as PhotoData[],
  files: [] as File[],
  previews: [] as string[],
  analyzing: false,
  result: null,
  saving: false,
  paying: false,
  paid: false,
  downloadingPdf: false,
};

export const useWizardStore = create<WizardState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setAssessmentId: (id) => set({ assessmentId: id }),
  setInsuranceCompanyId: (id) => set({ insuranceCompanyId: id }),
  setRepairerId: (id) => set({ repairerId: id }),
  updateFeeNote: (data) => set((s) => ({ feeNote: { ...s.feeNote, ...data } })),
  updateClaim: (data) => set((s) => ({ claim: { ...s.claim, ...data } })),
  updateVehicle: (data) => set((s) => ({ vehicle: { ...s.vehicle, ...data } })),
  updateVehicleCondition: (data) =>
    set((s) => ({ vehicleCondition: { ...s.vehicleCondition, ...data } })),
  updateAccidentDetail: (data) =>
    set((s) => ({ accidentDetail: { ...s.accidentDetail, ...data } })),

  setDamageItems: (items) => set({ damageItems: items }),
  updateDamageItem: (index, data) =>
    set((s) => ({
      damageItems: s.damageItems.map((item, i) => (i === index ? { ...item, ...data } : item)),
    })),
  addDamageItem: () =>
    set((s) => ({
      damageItems: [
        ...s.damageItems,
        {
          damageArea: "",
          partName: "",
          side: "",
          damageDescription: "",
          actionRequired: "Replace",
          accidentRelated: true,
          preAccidentDamage: false,
          remarks: "",
          sortOrder: s.damageItems.length,
        },
      ],
    })),
  removeDamageItem: (index) =>
    set((s) => ({ damageItems: s.damageItems.filter((_, i) => i !== index) })),

  setParts: (parts) => set({ parts }),
  updatePart: (index, data) =>
    set((s) => ({
      parts: s.parts.map((p, i) => {
        if (i !== index) return p;
        const updated = { ...p, ...data };
        return computePartTotals(updated);
      }),
    })),
  addPart: () =>
    set((s) => ({
      parts: [
        ...s.parts,
        computePartTotals({
          partName: "",
          partNumber: "",
          vehicleMake: "",
          vehicleModel: "",
          quantity: 1,
          unitPrice: 0,
          discountPercent: 0,
          discountAmount: 0,
          netPrice: 0,
          vatPercent: 16,
          vatAmount: 0,
          totalPrice: 0,
          partStatus: "Replace",
          remarks: "",
          sortOrder: s.parts.length,
        }),
      ],
    })),
  removePart: (index) => set((s) => ({ parts: s.parts.filter((_, i) => i !== index) })),

  setServices: (services) => set({ services }),
  updateService: (index, data) =>
    set((s) => ({
      services: s.services.map((svc, i) => {
        if (i !== index) return svc;
        const updated = { ...svc, ...data };
        return computeServiceTotals(updated);
      }),
    })),
  addService: () =>
    set((s) => ({
      services: [
        ...s.services,
        computeServiceTotals({
          description: "",
          quantity: 1,
          unitCost: 0,
          discount: 0,
          vat: 0,
          totalCost: 0,
          serviceType: "Labour",
          remarks: "",
          sortOrder: s.services.length,
        }),
      ],
    })),
  removeService: (index) => set((s) => ({ services: s.services.filter((_, i) => i !== index) })),

  updateRemark: (data) => set((s) => ({ remark: { ...s.remark, ...data } })),

  setAdditionalObservations: (obs) => set({ additionalObservations: obs }),
  addAdditionalObservation: () =>
    set((s) => ({
      additionalObservations: [
        ...s.additionalObservations,
        {
          damageDescription: "",
          insuredExplanation: "",
          assessorOpinion: "",
          accidentRelated: true,
          estimatedRepairCost: 0,
          estimatedPaintingCost: 0,
          estimatedTotalCost: 0,
          sortOrder: s.additionalObservations.length,
        },
      ],
    })),
  removeAdditionalObservation: (index) =>
    set((s) => ({
      additionalObservations: s.additionalObservations.filter((_, i) => i !== index),
    })),

  updateAuthorization: (data) =>
    set((s) => ({ authorization: { ...s.authorization, ...data } })),

  setSpecialInstructions: (instructions) => set({ specialInstructions: instructions }),
  addSpecialInstruction: (text) =>
    set((s) => ({
      specialInstructions: [
        ...s.specialInstructions,
        { instruction: text, sortOrder: s.specialInstructions.length },
      ],
    })),
  removeSpecialInstruction: (index) =>
    set((s) => ({
      specialInstructions: s.specialInstructions.filter((_, i) => i !== index),
    })),

  setSignatures: (sigs) => set({ signatures: sigs }),
  updateSignature: (index, data) =>
    set((s) => ({
      signatures: s.signatures.map((sig, i) => (i === index ? { ...sig, ...data } : sig)),
    })),
  addSignature: (role) =>
    set((s) => ({
      signatures: [
        ...s.signatures,
        {
          role,
          name: "",
          licenseNumber: "",
          organization: "",
          phone: "",
          email: "",
          address: "",
          signatureData: "",
          signatureDate: new Date().toISOString().split("T")[0],
        },
      ],
    })),
  removeSignature: (index) =>
    set((s) => ({ signatures: s.signatures.filter((_, i) => i !== index) })),

  setPhotos: (photos) => set({ photos }),
  addPhoto: (photo) => set((s) => ({ photos: [...s.photos, photo] })),
  removePhoto: (index) => set((s) => ({ photos: s.photos.filter((_, i) => i !== index) })),
  setFiles: (files) => set({ files }),
  setPreviews: (previews) => set({ previews }),

  setAnalyzing: (v) => set({ analyzing: v }),
  setResult: (r) => set({ result: r }),
  setSaving: (v) => set({ saving: v }),
  setPaying: (v) => set({ paying: v }),
  setPaid: (v) => set({ paid: v }),
  setDownloadingPdf: (v) => set({ downloadingPdf: v }),

  loadAssessment: (data: Record<string, unknown>) => {
    const d = data as Record<string, unknown>;
    const claim = d.claim as Record<string, unknown> | undefined;
    const vehicle = d.vehicle as Record<string, unknown> | undefined;
    const vc = d.vehicleCondition as (Record<string, unknown> & { tyres?: Array<Record<string, unknown>> }) | undefined;
    const ad = d.accidentDetail as Record<string, unknown> | undefined;
    const feeNote = d.feeNote as Record<string, unknown> | undefined;
    const auth = d.authorization as Record<string, unknown> | undefined;
    const remark = d.remark as Record<string, unknown> | undefined;
    const photos = d.photos as Array<Record<string, unknown>> | undefined;
    const damageItems = d.damageItems as Array<Record<string, unknown>> | undefined;
    const parts = d.parts as Array<Record<string, unknown>> | undefined;
    const services = d.services as Array<Record<string, unknown>> | undefined;
    const additionalObs = d.additionalObservations as Array<Record<string, unknown>> | undefined;
    const specialInstr = d.specialInstructions as Array<Record<string, unknown>> | undefined;
    const sigs = d.signatures as Array<Record<string, unknown>> | undefined;

    const updates: Record<string, unknown> = {};

    // Core FK fields
    if (d.insuranceCompanyId) updates.insuranceCompanyId = d.insuranceCompanyId;
    if (d.repairerId) updates.repairerId = d.repairerId;

    // Restore current step
    if (d.currentStep && PARAM_TO_STEP[d.currentStep as string]) {
      updates.step = PARAM_TO_STEP[d.currentStep as string];
    }

    // Restore AI analysis results from stored JSON string
    if (d.aiRawResponse && typeof d.aiRawResponse === "string") {
      try { updates.result = JSON.parse(d.aiRawResponse); } catch { /* ignore malformed */ }
    }

    if (feeNote) {
      updates.feeNote = {
        referenceNumber: feeNote.referenceNumber || "",
        assessmentDate: feeNote.assessmentDate ? new Date(feeNote.assessmentDate as string).toISOString().split("T")[0] : "",
        professionalFee: feeNote.professionalFee || 0,
        vat: feeNote.vat || 0,
        reimbursement: feeNote.reimbursement || 0,
        totalProfessionalFee: feeNote.totalProfessionalFee || 0,
      };
    }

    if (claim) {
      updates.claim = {
        claimNumber: claim.claimNumber || "",
        insuredName: claim.insuredName || "",
        insuredPhone: claim.insuredPhone || "",
        insuredEmail: claim.insuredEmail || "",
        insuredAddress: claim.insuredAddress || "",
        policyNumber: claim.policyNumber || "",
        sumInsured: claim.sumInsured || undefined,
        excessPercentage: claim.excessPercentage || undefined,
        excessAmount: claim.excessAmount || undefined,
        dateOfInstruction: claim.dateOfInstruction ? new Date(claim.dateOfInstruction as string).toISOString().split("T")[0] : undefined,
        dateOfAssessment: claim.dateOfAssessment ? new Date(claim.dateOfAssessment as string).toISOString().split("T")[0] : undefined,
      };
    }

    if (vehicle) {
      const makeObj = vehicle.make as Record<string, unknown> | undefined;
      const modelObj = vehicle.vehicleModel as Record<string, unknown> | undefined;
      const variantObj = vehicle.variant as Record<string, unknown> | undefined;
      updates.vehicle = {
        registrationNumber: vehicle.registrationNumber || "",
        makeId: vehicle.makeId || makeObj?.id || undefined,
        modelId: vehicle.modelId || modelObj?.id || undefined,
        variantId: vehicle.variantId || variantObj?.id || undefined,
        colour: vehicle.colour || "",
        yearOfManufacture: vehicle.yearOfManufacture || undefined,
        modeOfTransport: vehicle.modeOfTransport || "",
        engineType: vehicle.engineType || "",
        engineNumber: vehicle.engineNumber || "",
        chassisNumber: vehicle.chassisNumber || "",
        vin: vehicle.vin || "",
        mileage: vehicle.mileage || "",
        vehiclePopularity: vehicle.vehiclePopularity || "",
        repairerName: vehicle.repairerName || "",
      };
    }

    if (vc) {
      const tyres = vc.tyres?.map((t) => ({ position: t.position as string, percentage: t.percentage as number })) || [
        { position: "RHF", percentage: 0 },
        { position: "RHR", percentage: 0 },
        { position: "LHF", percentage: 0 },
        { position: "LHR", percentage: 0 },
      ];
      updates.vehicleCondition = {
        overallCondition: vc.overallCondition || "",
        tyreBrand: vc.tyreBrand || "",
        tyreSize: vc.tyreSize || "",
        spareTyreCondition: vc.spareTyreCondition || "",
        mechanicalCondition: vc.mechanicalCondition || "",
        interiorCondition: vc.interiorCondition || "",
        exteriorCondition: vc.exteriorCondition || "",
        tyres,
      };
    }

    if (ad) {
      updates.accidentDetail = {
        accidentDate: ad.accidentDate ? new Date(ad.accidentDate as string).toISOString().split("T")[0] : undefined,
        accidentLocation: ad.accidentLocation || "",
        accidentDescription: ad.accidentDescription || "",
        accidentCircumstances: ad.accidentCircumstances || "",
        damageDescription: ad.damageDescription || "",
        insuredExplanation: ad.insuredExplanation || "",
        assessorObservation: ad.assessorObservation || "",
        damageConsistentWithAccident: ad.damageConsistentWithAccident ?? true,
        damageConsistencyNote: ad.damageConsistencyNote || "",
      };
    }

    if (damageItems) {
      updates.damageItems = damageItems.map((d, i) => ({
        id: d.id,
        damageArea: d.damageArea || "",
        partName: d.partName || "",
        side: d.side || "",
        damageDescription: d.damageDescription || "",
        actionRequired: d.actionRequired || "Replace",
        accidentRelated: d.accidentRelated ?? true,
        preAccidentDamage: d.preAccidentDamage ?? false,
        remarks: d.remarks || "",
        sortOrder: i,
      }));
    }

    if (parts) {
      updates.parts = parts.map((p, i) => ({
        id: p.id,
        partName: p.partName || "",
        partNumber: p.partNumber || "",
        vehicleMake: p.vehicleMake || "",
        vehicleModel: p.vehicleModel || "",
        quantity: p.quantity || 1,
        unitPrice: p.unitPrice || 0,
        discountPercent: p.discountPercent || 0,
        discountAmount: p.discountAmount || 0,
        netPrice: p.netPrice || 0,
        vatPercent: p.vatPercent || 16,
        vatAmount: p.vatAmount || 0,
        totalPrice: p.totalPrice || 0,
        partStatus: p.partStatus || "Replace",
        remarks: p.remarks || "",
        sortOrder: i,
      }));
    }

    if (services) {
      updates.services = services.map((s, i) => ({
        id: s.id,
        description: s.description || "",
        quantity: s.quantity || 1,
        unitCost: s.unitCost || 0,
        discount: s.discount || 0,
        vat: s.vat || 0,
        totalCost: s.totalCost || 0,
        serviceType: s.serviceType || "Labour",
        remarks: s.remarks || "",
        sortOrder: i,
      }));
    }

    if (remark) {
      updates.remark = {
        generalRemarks: remark.generalRemarks || "",
        partsToBeReplaced: remark.partsToBeReplaced || "",
        partsToBePainted: remark.partsToBePainted || "",
        partsRequiringRepair: remark.partsRequiringRepair || "",
        preAccidentDamage: remark.preAccidentDamage || "",
        additionalObservations: remark.additionalObservations || "",
      };
    }

    if (additionalObs) {
      updates.additionalObservations = additionalObs.map((o, i) => ({
        id: o.id,
        damageDescription: o.damageDescription || "",
        insuredExplanation: o.insuredExplanation || "",
        assessorOpinion: o.assessorOpinion || "",
        accidentRelated: o.accidentRelated ?? true,
        estimatedRepairCost: o.estimatedRepairCost || 0,
        estimatedPaintingCost: o.estimatedPaintingCost || 0,
        estimatedTotalCost: o.estimatedTotalCost || 0,
        sortOrder: i,
      }));
    }

    if (auth) {
      updates.authorization = {
        authorized: auth.authorized ?? false,
        authorizationStatus: auth.authorizationStatus || "Pending Authorization",
        copyToRepairer: auth.copyToRepairer ?? false,
        salvageValue: auth.salvageValue || undefined,
        preAccidentValue: auth.preAccidentValue || undefined,
        assessmentStatus: auth.assessmentStatus || d.status || "DRAFT",
      };
    }

    if (specialInstr) {
      updates.specialInstructions = specialInstr.map((si, i) => ({
        instruction: si.instruction || "",
        sortOrder: i,
      }));
    }

    if (sigs) {
      updates.signatures = sigs.map((sig) => ({
        id: sig.id,
        role: sig.role || "ASSESSOR",
        name: sig.name || "",
        licenseNumber: sig.licenseNumber || "",
        organization: sig.organization || "",
        phone: sig.phone || "",
        email: sig.email || "",
        address: sig.address || "",
        signatureData: sig.signatureData || "",
        signatureDate: sig.signatureDate ? new Date(sig.signatureDate as string).toISOString().split("T")[0] : "",
      }));
    }

    if (photos) {
      updates.photos = photos.map((p, i) => ({
        id: p.id,
        filename: p.filename || "",
        originalName: p.originalName || "",
        path: p.path || "",
        mimeType: p.mimeType || "",
        size: p.size || 0,
        sortOrder: i,
        caption: p.caption || "",
      }));
      updates.previews = photos.map((p) => p.path as string);
    }

    set(updates as Partial<WizardState>);
  },

  reset: () => set(initialState),

  getCostSummary: () => {
    const { parts, services } = get();
    return computeCostSummary(parts, services);
  },
}));

export { STEP_PARAM, PARAM_TO_STEP };
export type { Step };
