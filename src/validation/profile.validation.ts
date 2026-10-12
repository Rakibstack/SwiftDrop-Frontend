
import { z } from "zod";

export const updateMerchantProfileSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters long")
    .max(150, "Business name cannot exceed 150 characters")
    .optional()
    .or(z.literal("")),

  businessPhone: z
    .string()
    .trim()
    .regex(
      /^01[3-9]\d{8}$/,
      "Please provide a valid Bangladeshi phone number",
    )
    .optional()
    .or(z.literal("")),

  businessAddress: z
    .string()
    .trim()
    .min(5, "Business address must be at least 5 characters long")
    .max(300, "Business address cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),
});

export const updateRiderProfileSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(
      /^01[3-9]\d{8}$/,
      "Please provide a valid Bangladeshi phone number",
    )
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(300, "Address cannot exceed 300 characters")
    .optional()
    .or(z.literal("")),

  vehicleType: z
    .enum(["BIKE", "MOTORCYCLE"], {
      message: "Please select a valid vehicle type",
    })
    .optional(),

  licenseNumber: z
    .string()
    .trim()
    .min(5, "License number must be at least 5 characters long")
    .max(50, "License number cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateMerchantProfileFormValues = z.infer<
  typeof updateMerchantProfileSchema
>;

export type UpdateRiderProfileFormValues = z.infer<
  typeof updateRiderProfileSchema
>;