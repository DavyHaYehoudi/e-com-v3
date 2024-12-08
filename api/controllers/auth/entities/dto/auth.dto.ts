import { z } from "zod";

// // Schéma pour un élément de la wishlist
// const wishlistSchema = z.array(z.string()).default([]);

// // Schéma pour un élément produit dans le panier
// const cartProductSchema = z.object({
//   productId: z.string(),
//   quantity: z.number().positive(),
//   variant: z.string().optional().nullable().default(null),
// });

// // Schéma pour un élément de carte cadeau dans le panier
// const cartGiftcardSchema = z.object({
//   idTemp: z.number(),
//   amount: z.number().positive(),
//   quantity: z.number().positive(),
// });

// const cartProductsSchema = z.array(cartProductSchema).default([]);
// const cartGiftcardsSchema = z.array(cartGiftcardSchema).default([]);

// Schéma principal pour l'authentification avec wishlist et cart
export const authRequestSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  cartProducts: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        variant: z.string().optional().nullable().default(null),
        name: z.string(),
        heroImage: z.string(),
        newUntil: z.string().optional().nullable().default(null),
        price: z.number(),
        promotionPercentage: z.number(),
        promotionEndDate: z
        .string()
        .datetime({ offset: true }) // Vérifie que c'est une chaîne ISO 8601 2025-11-30T00:00:00.000Z
        .transform((val) => new Date(val)) // Transforme en `Date`
        .nullable()
        .optional(),
      })
    )
    .optional(),
  cartGiftcards: z
    .array(
      z.object({
        idTemp: z.number(),
        amount: z.number().min(0),
        quantity: z.number().min(1),
      })
    )
    .optional(),
  wishlistProducts: z.array(z.string()).optional(),
});

// Export des types pour une utilisation externe
// export type WishlistProducts = z.infer<typeof wishlistSchema>;
// export type CartProducts = z.infer<typeof cartProductsSchema>;
// export type CartGiftcards = z.infer<typeof cartGiftcardsSchema>;
export type AuthRequestDTO = z.infer<typeof authRequestSchema>;
