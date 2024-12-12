import { z } from "zod";

// Schéma Zod pour la validation des données
export const identitySchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Numéro de téléphone invalide")
    .nullable()
    .optional(),
  birthdate: z.string().optional().nullable(), // Format YYYY-MM-DD
  emailMarketingConsent: z.boolean().optional(), 
});

// Types pour les données du profil
export type IdentityFormData = z.infer<typeof identitySchema>;
