import { z } from "zod";
// Schéma pour valider la création d'une collection(POST)
export const createCollectionSchema = z.object({
  label: z.string().min(1, { message: "Le nom de la collection est requis." }),
});
