import { z } from "zod";
// Schéma pour valider la création d'une campagne marketing (POST)
export const createMarketingCampaignSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Le sujet de la campagne est requis." }),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." }),
  imageUrl: z.string().nullable().optional(), // Peut être null ou absent
});
// Schéma pour valider la modification et l'envoi d'une campagne marketing (PATCH)
export const updateMarketingCampaignSchema = z.object({
  emails: z.array(z.string().email({ message: "Email invalide." })),
});
