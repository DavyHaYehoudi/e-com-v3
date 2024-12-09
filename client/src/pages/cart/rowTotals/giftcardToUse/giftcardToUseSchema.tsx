import * as z from "zod";

// Schéma de validation Zod
export const giftCardToUseSchema = z.object({
  code: z.string().min(1, "Le code ne peut pas être vide."),
});
