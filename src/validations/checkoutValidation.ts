import { z } from "zod";
import { addressValidation } from "./addressValidation";

export default z.object({
  address: addressValidation,
  paymentMethod: z.enum(["cod", "upi", "paypal"]),
});
