import { add } from "date-fns";
import { z } from "zod";

// Définition du schéma Zod pour un produit
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis."),
  description: z.string().min(1, "La description est requise."),
  heroImage: z.string().optional(),
  // .url("Une URL valide est requise pour l'image principale."),
  promotionPercentage: z.number().min(0).max(99).optional(),
  promotionEndDate: z
    .date()
    .refine((date) => date > new Date(), "La date de fin doit être du futur.")
    .nullable(),
  continueSelling: z.boolean().optional(),
  quantityInStock: z
    .number()
    .min(0, "La quantité en stock doit être un entier positif."),
  price: z.number().min(1, "Le prix doit être un nombre positif."),
  newUntil: z
    .date()
    .refine((date) => date > new Date(), "La date de fin doit être du futur.")
    .nullable(),
  isPublished: z.boolean().optional(),
  cashback: z.number().min(0).optional(),
  collections: z.array(
    z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
  ),
  categories: z.array(
    z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
  ),
  tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")),
  variants: z
    .array(
      z.object({
        combination: z.string().min(1, "La combinaison est requise."),
        mainImage: z.string(),
        // .url("Une URL valide est requise pour l'image principale."),
        secondaryImages: z
          // .array(z.string().url("Chaque URL doit être valide."))
          .array(z.string())
          .optional(),
      })
    )
    .optional(),
  isStar: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

// Type généré à partir du schéma Zod
export type ProductInputDTO = z.infer<typeof productSchema>;

export const initValues: ProductInputDTO = {
  name: "",
  description: "",
  heroImage: "",
  promotionPercentage: 0,
  promotionEndDate: null,
  continueSelling: false,
  quantityInStock: 1,
  price: 20,
  newUntil: add(new Date(), { months: 3 }),
  isPublished: true,
  cashback: 0,
  collections: [],
  categories: [],
  tags: [],
  variants: [],
  isStar: false,
  isArchived: false,
};
