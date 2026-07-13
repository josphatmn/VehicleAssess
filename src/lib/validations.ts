import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const step1Schema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().min(5, "Phone number is required"),
  customerEmail: z.string().email("Please enter a valid email"),
  insuranceCompany: z.string().optional(),
  claimNumber: z.string().optional(),
});

export const step2Schema = z.object({
  registrationNumber: z.string().optional(),
  vin: z.string().optional(),
  odometer: z.string().optional(),
  vehicleNotes: z.string().optional(),
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
