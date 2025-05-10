import { z } from "zod";

const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format

export const addressValidation = z.object({
  userId: z
    .string()
    .min(2, {
      message: "User ID must be at least 2 characters.",
    })
    .optional(),
  addressId: z
    .string()
    .min(2, {
      message: "Address ID must be at least 2 characters.",
    })
    .optional(),
  lat: z
    .number({
      invalid_type_error: "Latitude must be a number",
      required_error: "Latitude is required",
    })
    .min(-90, {
      message: "Latitude must be between -90 and 90 degrees",
    })
    .max(90, {
      message: "Latitude must be between -90 and 90 degrees",
    }),
  lng: z
    .number({
      invalid_type_error: "Longitude must be a number",
      required_error: "Longitude is required",
    })
    .min(-180, {
      message: "Longitude must be between -180 and 180 degrees",
    })
    .max(180, {
      message: "Longitude must be between -180 and 180 degrees",
    }),
  province: z.string().min(2, {
    message: "Province must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(9, {
      message: "Phone number must be at least 9 digits.",
    })
    .regex(phoneRegex, {
      message: "Phone number must be in E.164 format (e.g., +1234567890)",
    }),
});

export const otpValidation = z.object({
  otp: z
    .string()
    .length(6, {
      message: "OTP must be exactly 6 digits.",
    })
    .regex(/^\d+$/, {
      message: "OTP must contain only numbers.",
    }),
});
