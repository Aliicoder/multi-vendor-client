import { z } from "zod";

export default z.object({
  _id: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }).optional(),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  area: z.string().min(2, {
    message: "area must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  pinCode: z.string().min(2, {
    message: "pinCode must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "type must be at least 2 characters.",
  }),
  province: z.string().min(2, {
    message: "province must be at least 2 characters.",
  }),
})