import { z } from "zod";

export const createAdminGiftCardSchema = z.object({
  firstHolderId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"), // Validation MongoDB ID
  initialValue: z
    .number()
    .positive("Initial value must be a positive number")
    .min(1, "Initial value must be at least 1"),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .transform((dateStr) => new Date(dateStr)), // Conversion en Date
});

// Définition du type dérivé pour réutilisation
export type CreateAdminGiftcardInput = z.infer<
  typeof createAdminGiftCardSchema
>;
