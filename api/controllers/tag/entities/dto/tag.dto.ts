import { z } from "zod";

// Schéma pour valider la création d'un tag(POST)
export const createTagSchema = z.object({
  label: z.string().min(1, { message: "Le nom du tag est requis." }),
});

export type CreateTagDTO = z.infer<typeof createTagSchema>;
