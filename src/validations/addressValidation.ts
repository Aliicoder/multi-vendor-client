import { z } from "zod";

export default z.object({
  userId: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  addressId: z
    .string()
    .min(2, {
      message: "addressId must be at least 2 characters.",
    })
    .optional(),
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

  province: z.string().min(2, {
    message: "province must be at least 2 characters.",
  }),

  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "street must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
});
