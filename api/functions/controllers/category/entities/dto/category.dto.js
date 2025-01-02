import { z } from "zod";
// Schéma pour valider la création d'un tag(POST)
export const createCategorySchema = z.object({
  label: z.string().min(1, { message: "Le nom de la catégorie est requis." }),
});
