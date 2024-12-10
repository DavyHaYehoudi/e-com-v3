import { z } from "zod";

// Schéma pour valider chaque élément du tableau giftcardsToUse
const giftcardsToUseSchema = z.array(
  z.object({
    _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validation d'un ObjectId MongoDB
    amountToUse: z.number().min(0, "Amount must be a positive number"), // Validation du montant (minimum 0)
  })
);

// Schéma pour valider les paramètres de la route GET /payment/amount
export const paymentAmountCustomerSchema = z.object({
  promocode: z.string().nullable().optional().default(null), // Code promo optionnel
  giftcardsToUse: giftcardsToUseSchema.optional().default([]), // Tableau de giftcards à utiliser
  cashbackToSpend: z.coerce.number().min(0).nullable().optional().default(null), // Cashback optionnel
  emailCustomer: z.string().email().nullable().optional().default(null), // Email du client
});

// Types dérivés pour PaymentAmount
export type PaymentAmountCustomerDTO = z.infer<
  typeof paymentAmountCustomerSchema
>;
