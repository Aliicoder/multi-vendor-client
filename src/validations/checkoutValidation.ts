import { z } from "zod";

const AddressSchema = z.object({
  _id: z.string().optional(),
  lat: z
    .number({
      message: "invalid latitude coordinates",
    })
    .min(-90)
    .max(90),
  lng: z
    .number({
      message: "invalid longitude coordinates",
    })
    .min(-180)
    .max(180),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  province: z.string().min(1, "Province is required"),
});

export default z.object({
  address: AddressSchema,
  paymentMethod: z.enum(["cod", "card", "upi", "netbanking", "paypal"]),
});
