import { z } from "zod";

// Schéma pour un élément de la wishlist
const wishlistSchema = z.array(z.string()).default([]);

// Schéma pour un élément produit dans le panier
const cartProductSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
  variant: z.string().optional().nullable().default(null),
});

// Schéma pour un élément de carte cadeau dans le panier
const cartGiftcardSchema = z.object({
  idTemp: z.number(),
  amount: z.number().positive(),
  quantity: z.number().positive(),
});

const cartProductsSchema = z.array(cartProductSchema).default([]);
const cartGiftcardsSchema = z.array(cartGiftcardSchema).default([]);

// Schéma principal pour l'authentification avec wishlist et cart
export const authRequestSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  wishlistProducts: wishlistSchema,
  cartProducts: cartProductsSchema,
  cartGiftcards: cartGiftcardsSchema,
});

// Export des types pour une utilisation externe
export type WishlistProducts = z.infer<typeof wishlistSchema>;
export type CartProducts = z.infer<typeof cartProductsSchema>;
export type CartGiftcards = z.infer<typeof cartGiftcardsSchema>;
export type AuthRequestDTO = z.infer<typeof authRequestSchema>;
