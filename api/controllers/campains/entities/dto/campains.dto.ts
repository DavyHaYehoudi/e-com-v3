import { z } from "zod";

// Schéma pour valider la création d'une campagne marketing (POST)
export const createMarketingCampaignSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Le sujet de la campagne est requis." }),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." }),
});

// Schéma pour valider la modification et l'envoi d'une campagne marketing (PATCH)
export const updateMarketingCampaignSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Le sujet de la campagne est requis." }),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." }),
  status: z.enum(["prepared", "sent"]), // Permet de modifier le statut, y compris pour 'sent' lors de l'envoi
  emails: z.array(z.string().email({ message: "Email invalide." })),
});

// Types
export type CreateMarketingCampaignDTO = z.infer<
  typeof createMarketingCampaignSchema
>;
export type UpdateMarketingCampaignDTO = z.infer<
  typeof updateMarketingCampaignSchema
>;
