import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const feeNoteSchema = z.object({
  referenceNumber: z.string().optional(),
  assessmentDate: z.string().optional(),
  professionalFee: z.number().min(0).optional(),
  vat: z.number().min(0).optional(),
  reimbursement: z.number().min(0).optional(),
  totalProfessionalFee: z.number().min(0).optional(),
});

export const claimSchema = z.object({
  claimNumber: z.string().optional(),
  insuredName: z.string().min(1, "Insured name is required"),
  insuredPhone: z.string().optional(),
  insuredEmail: z.string().email().optional().or(z.literal("")),
  insuredAddress: z.string().optional(),
  policyNumber: z.string().optional(),
  sumInsured: z.number().optional(),
  excessPercentage: z.number().min(0).max(100).optional(),
  dateOfInstruction: z.string().optional(),
  dateOfAssessment: z.string().optional(),
});

export const vehicleDetailSchema = z.object({
  registrationNumber: z.string().optional(),
  makeId: z.string().optional(),
  modelId: z.string().optional(),
  variantId: z.string().optional(),
  colour: z.string().optional(),
  yearOfManufacture: z.number().int().min(1900).max(2100).optional(),
  modeOfTransport: z.string().optional(),
  engineType: z.string().optional(),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
  vin: z.string().optional(),
  mileage: z.string().optional(),
  vehiclePopularity: z.string().optional(),
  repairerName: z.string().optional(),
});

export const vehicleMakeSchema = z.object({
  name: z.string().min(2, "Make name is required"),
});

export const vehicleModelSchema = z.object({
  name: z.string().min(2, "Model name is required"),
  makeId: z.string().min(1, "Vehicle make is required"),
});

export const vehicleVariantSchema = z.object({
  name: z.string().min(2, "Variant name is required"),
  modelId: z.string().min(1, "Vehicle model is required"),
});

export const vehiclePartSchema = z.object({
  partNumber: z.string().min(1, "Part number is required"),
  name: z.string().min(2, "Part name is required"),
  category: z.string().min(1, "Category is required"),
  unitPrice: z.number().min(0, "Price must be positive"),
  labourCost: z.number().min(0, "Labour cost must be positive"),
  variantId: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "ASSESSOR"]),
});

export const damageItemSchema = z.object({
  damageArea: z.string().optional(),
  partName: z.string().optional(),
  side: z.string().optional(),
  damageDescription: z.string().optional(),
  actionRequired: z.string().optional(),
  accidentRelated: z.boolean().default(true),
  preAccidentDamage: z.boolean().default(false),
  remarks: z.string().optional(),
});

export const assessmentPartSchema = z.object({
  partName: z.string().min(1, "Part name is required"),
  partNumber: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0),
  discountPercent: z.number().min(0).max(100).default(0),
  vatPercent: z.number().min(0).max(100).default(16),
  partStatus: z.string().optional(),
  remarks: z.string().optional(),
});

export const assessmentServiceSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().min(1),
  unitCost: z.number().min(0),
  discount: z.number().min(0).default(0),
  serviceType: z.string().optional(),
  remarks: z.string().optional(),
});
