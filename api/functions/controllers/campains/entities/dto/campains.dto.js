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
    .min(1, { message: "Le sujet de la campagne est requis." })
    .optional(),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." })
    .optional(),
  emails: z.array(z.string().email({ message: "Email invalide." })).optional(),
  status: z.enum(["draft", "prepared", "sent"]).optional(),
});
