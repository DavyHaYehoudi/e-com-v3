import * as z from "zod";
export const promoCodeSchema = z.object({
  code: z.string().min(1, "Le code promo ne peut pas être vide."),
});
