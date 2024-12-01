import { z } from "zod";

export const updateCustomerSchema = z.object({
  firstName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
  phone: z
    .string()
    .regex(/^\+[0-9]{1,3}\s*[0-9]{1,15}$/)
    .optional(),
  avatarUrl: z.string().url().optional(),
  birthdate: z.string().optional(),
  shippingAddress: z
    .object({
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
    })
    .optional(),
  billingAddress: z
    .object({
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
    })
    .optional(),
  cartProducts: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .optional(),
  cartGiftcards: z
    .array(
      z.object({
        amount: z.number().min(0),
        quantity: z.number().min(1),
      })
    )
    .optional(),
  wishlistProducts: z.array(z.string()).optional(),
  emailMarketingConsent: z.boolean().optional(),
  isActive: z.boolean().optional(),
});
export type FieldsUpdateCustomerDTO = z.infer<typeof updateCustomerSchema>;

// Schéma pour valider les ObjectId de MongoDB
const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId");

// Schéma Zod pour CashbackType
export const cashbackSchema = z.object({
  cashbackEarned: z
    .number()
    .min(0, "Cashback earned must be a positive number"),
  cashbackSpent: z.number().min(0, "Cashback spent must be a positive number"),
  label: z.enum([
    "loyalty",
    "birthday",
    "order",
    "other",
    "review",
    "referral",
  ]),
  orderNumber: z.string().optional(),
  reviewId: objectIdSchema.optional(),
});

// Export du type TypeScript dérivé de Zod
export type CashbackTypeDTO = z.infer<typeof cashbackSchema>;
