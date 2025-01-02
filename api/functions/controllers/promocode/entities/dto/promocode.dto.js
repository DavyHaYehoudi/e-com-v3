import { z } from "zod";
// Schéma pour valider la création d'un code promo (POST)
export const createPromocodeSchema = z.object({
  code: z.string({
    message: "Le code est requis.",
  }),
  promocodePercentage: z.number().min(0).max(100, {
    message: "Le pourcentage de réduction doit être entre 0 et 100.",
  }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date de début doit être au format YYYY-MM-DD.",
  }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date de fin doit être au format YYYY-MM-DD.",
  }),
});
