import { z } from "zod";

const AddressSchema = z.object({
  _id: z.string().optional(),
  type: z.enum(["home", "work", "other"]),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  pinCode: z.string().regex(/^\d{6}$/, "Pin Code must be a valid 6-digit number"),
  province: z.string().min(1, "Province is required"),
});


export default z.object({
  address: AddressSchema,
  paymentMethod: z.enum(["cod", "card", "upi"])
});