import { z } from "zod";
// Schéma pour valider l'adresse dans une commande
export const addressSchema = z.object({
  company: z.string().max(20).optional().default(""),
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  email: z.string().email(),
  phone: z.string().regex(/^0[1-9][0-9]{8}$/, "Invalid phone number"),
  streetNumber: z.string().max(10),
  address1: z.string().max(100),
  address2: z.string().max(100).optional().default(""),
  city: z.string().max(50),
  postalCode: z.string().max(10),
  country: z.string().max(50).optional().default(""),
});
// Schéma pour valider chaque élément du tableau giftcardsToUse
const giftcardsToUseSchema = z.array(
  z.object({
    _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validation d'un ObjectId MongoDB
    amountToUse: z.number().min(0, "Amount must be a positive number"), // Validation du montant (minimum 0)
  })
);
// Schéma pour valider les informations d'une commande
export const createOrderSchema = z.object({
  promocode: z.string().nullable().optional().default(null), // Code promo optionnel
  cashbackToSpend: z.coerce.number().min(0).nullable().optional().default(null), // Cashback optionnel
  orderAddressShipping: addressSchema,
  orderAddressBilling: addressSchema,
  giftcardsToUse: giftcardsToUseSchema.optional().default([]), // Tableau de giftcards à utiliser
});
