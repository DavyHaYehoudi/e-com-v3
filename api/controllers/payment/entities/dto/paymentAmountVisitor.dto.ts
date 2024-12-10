import { z } from "zod";

// Schéma pour valider chaque élément du tableau giftcardsToUse
const giftcardsToUseSchema = z.array(
  z.object({
    _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validation d'un ObjectId MongoDB
    amountToUse: z.number().min(0, "Amount must be a positive number"), // Validation du montant (minimum 0)
  })
);

// Schéma pour valider chaque produit dans cartProducts
const cartProductSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // ID produit valide
  quantity: z.number().min(1, "Quantity must be at least 1"), // Quantité minimale
});

// Schéma pour valider chaque élément de cartGiftcards
const cartGiftcardSchema = z.object({
  amount: z.number().min(0, "Giftcard amount must be a positive number"), // Montant minimal
  quantity: z.number().min(1, "Quantity must be at least 1"), // Quantité minimale
});

// Schéma pour valider les paramètres de la route GET /payment/amount
export const paymentAmountVisitorSchema = z.object({
  promocode: z.string().nullable().optional().default(null), // Code promo optionnel
  giftcardsToUse: giftcardsToUseSchema.optional().default([]), // Tableau de giftcards à utiliser
  cartProducts: z.array(cartProductSchema).optional().default([]), // Produits du panier
  cartGiftcards: z.array(cartGiftcardSchema).optional().default([]), // Cartes cadeaux du panier
  cashbackToSpend: z.coerce.number().min(0).nullable().optional().default(null), // Cashback optionnel
});

// Types dérivés pour PaymentAmount
export type PaymentAmountVisitorDTO = z.infer<
  typeof paymentAmountVisitorSchema
>;
