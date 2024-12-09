// cashbackSchema.ts
import { z } from "zod";

export const cashbackToUseSchema = (maxCashback: number) => 
  z.object({
    cashbackAmount: z
      .number()
      .min(0, { message: "Le montant ne peut pas être négatif" })
      .max(maxCashback, { message: "Le montant dépasse la limite autorisée" })
      .nullable() // Permet d'avoir une valeur null si l'input est vide
  });
