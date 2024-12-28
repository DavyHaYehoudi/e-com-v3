import { z } from "zod";

// Schéma pour l'objet OrderItem
export const orderItemSchema = z.object({
  _id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
  productId: z.string().nonempty("Product ID is required"), // ID produit
  name: z.string().nonempty("Name is required"), // Nom
  variant: z.string().nonempty("Variant is required"), // Variante
  customerId: z.string().nonempty("Customer ID is required"), // ID client
  articleNumber: z.number().int().min(1, "Article number must be positive"), // Numéro d'article (positif)
  heroImage: z.string().nonempty("Hero image is required"), // URL de l'image du produit
  priceBeforePromotionOnProduct: z
    .number()
    .min(0, "Price must be a positive number"), // Prix avant promotion
  promotionPercentage: z.number().min(0, "Promotion percentage must be >= 0"), // Pourcentage de promotion
  exchangeNumber: z.number().nullable().optional(), // Numéro d'échange (peut être nul)
  exchangeAt: z
    .string()
    .datetime({ offset: true })
    .transform((val) => new Date(val))
    .nullable()
    .optional(), // Date d'échange (peut être nul)
  refundNumber: z.number().nullable().optional(), // Numéro de remboursement (peut être nul)
  refundAt: z
    .string()
    .datetime({ offset: true })
    .transform((val) => new Date(val))
    .nullable()
    .optional(), // Date de remboursement (peut être nul)
  refundAmount: z.number().nullable().optional(), // Montant remboursé (peut être nul)
  returnNumber: z.number().nullable().optional(), // Numéro de retour (peut être nul)
  returnAt: z
    .string()
    .datetime({ offset: true })
    .transform((val) => new Date(val))
    .nullable()
    .optional(), // Date de retour (peut être nul)
  cashbackEarned: z.number().min(0, "Cashback earned must be >= 0"), // Cashback gagné
});
// Schéma pour le numéro de suivi
export const trackingNumberSchema = z.object({
  trackingNumber: z.string().nonempty("Tracking number is required"), // Numéro de suivi (obligatoire)
  dateSending: z
    .string()
    .datetime({ offset: true })
    .transform((val) => new Date(val))
    .nullable()
    .optional(),
});

// Schéma pour modifier une commande (PATCH)
export const updateOrderSchema = z.object({
  statusOrder: z.number().optional(), // Statut de la commande (peut être omis)
  statusPayment: z.number().optional(), // Statut du paiement (peut être omis)
  orderItem: orderItemSchema.optional(), // Un ordre peut avoir un ou plusieurs éléments à mettre à jour
  trackingNumber: trackingNumberSchema.optional(), // Numéro de suivi
});

export type UpdateOrderDTO = z.infer<typeof updateOrderSchema>;
export type TrackingNumberDTO = z.infer<typeof trackingNumberSchema>;
