import { z } from "zod";

// Schéma Zod pour la validation des données
export const identitySchema = z.object({
  firstName: z
    .string()
    .max(20, "Le prénom est limité à 20 caractères.")
    .optional()
    .nullable(),
  lastName: z
    .string()
    .max(20, "Le nom est limité à 20 caractères.")
    .optional()
    .nullable(),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(/^0[1-9][0-9]{8}$/, "Numéro de téléphone invalide")
    .or(z.literal("")) // Accepter une chaîne vide
    .optional(), // Champ optionnel
  birthdate: z.string().optional().nullable(), // Format YYYY-MM-DD
  emailMarketingConsent: z.boolean().optional(),
});

// Types pour les données du profil
export type IdentityFormData = z.infer<typeof identitySchema>;
