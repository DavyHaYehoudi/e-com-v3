import { z } from "zod";

// Schéma pour valider l'adresse dans une commande
export const addressSchema = z.object({
  company: z.string().max(20).optional(),
  firstName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+[0-9]{1,3}\s*[0-9]{1,15}$/)
    .optional(),
  streetNumber: z.string().max(10).optional(),
  address1: z.string().max(100).optional(),
  address2: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  postalCode: z.string().max(10).optional(),
  country: z.string().max(50).optional(),
});
// Schéma pour valider chaque élément du tableau giftcardsToUse
const giftcardsToUseSchema = z.array(
  z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validation d'un ObjectId MongoDB
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

// Schema pour la création d'une commande
// export interface orderSchema {
//   customerId: string;
//   orderStatusNumber: number;
//   paymentStatusNumber: number;
//   orderNumber: string;
//   promocodeAmount: number | null;
//   totalPromoProducts: number | null;
//   totalPrice: number;
//   cashBackEarned: number | null;
//   cashBackSpent: number | null;
// }
// Types dérivés pour PaymentConfirmation
export type PaymentConfirmationDTO = z.infer<typeof createOrderSchema>;
export type AddressConfirmationDTO = z.infer<typeof addressSchema>;
