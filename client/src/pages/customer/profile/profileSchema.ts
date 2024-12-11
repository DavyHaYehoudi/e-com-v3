import { z } from "zod";

// Schéma Zod pour la validation des données
export const profileSchema = z.object({
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Numéro de téléphone invalide")
    .nullable()
    .optional(),
  birthday: z.string().optional().nullable(), // Format YYYY-MM-DD
  email_marketing_consent: z.boolean().optional(), 
});

// Types pour les données du profil
export type ProfileFormData = z.infer<typeof profileSchema>;
