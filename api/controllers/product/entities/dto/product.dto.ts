import { z } from "zod";

// Définition du schéma Zod pour un produit
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  heroImage: z
    .string()
    .url("Une URL valide est requise pour l'image principale."),
  promotionPercentage: z.number().min(0).max(100).optional(),
  promotionEndDate: z
  .string()
  .datetime({ offset: true }) // Vérifie que c'est une chaîne ISO 8601 2025-11-30T00:00:00.000Z
  .transform((val) => new Date(val)) // Transforme en `Date`
  .nullable()
  .optional(),
  continueSelling: z.boolean().optional(),
  quantityInStock: z
    .number()
    .min(0, "La quantité en stock doit être un entier positif."),
  price: z.number().min(0, "Le prix doit être un nombre positif."),
  newUntil: z
  .string()
  .datetime({ offset: true }) // 2025-11-30T00:00:00.000Z
  .transform((val) => new Date(val))
  .nullable()
  .optional(),
  isPublished: z.boolean().optional(),
  cashback: z.number().min(0).optional(),
  categories: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .optional(),
  tags: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .optional(),
  variants: z
    .array(
      z.object({
        combination: z.string().min(1, "La combinaison est requise."),
        mainImage: z
          .string()
          .url("Une URL valide est requise pour l'image principale."),
        secondaryImages: z
          .array(z.string().url("Chaque URL doit être valide."))
          .optional(),
      })
    )
    .optional(),
  isStar: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});
 
// Type généré à partir du schéma Zod
export type ProductInputDTO = z.infer<typeof productSchema>;

export const getAllProductsQuerySchema = z.object({
  name: z.string().min(3).optional(),
  minPrice: z.coerce.number().int().positive().optional(), // Convertit automatiquement en nombre
  maxPrice: z.coerce.number().int().positive().optional(),
  onPromotion: z.coerce.boolean().optional(),
  isNew: z.coerce.boolean().optional(),
  tagIds: z.preprocess(
    (val) => (Array.isArray(val) ? val : val ? [val] : []),
    z.array(z.string()).optional()
  ),
  categoryIds: z.preprocess(
    (val) => (Array.isArray(val) ? val : val ? [val] : []),
    z.array(z.string()).optional()
  ),
  isStar: z
    .string()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    )
    .optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export type GetAllProductsQuery = z.infer<typeof getAllProductsQuerySchema>;
