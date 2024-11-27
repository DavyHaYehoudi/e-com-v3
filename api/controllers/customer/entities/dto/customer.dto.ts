import { z } from "zod";

export const updateCustomerSchema = z.object({
  firstName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
  phone: z.string().regex(/^\+[0-9]{1,3}\s*[0-9]{1,15}$/).optional(),
  avatarUrl: z.string().url().optional(),
  birthdate: z.string().optional(),
  shippingAddress: z
    .object({
      company: z.string().max(20).optional(),
      firstName: z.string().max(20).optional(),
      lastName: z.string().max(20).optional(),
      email: z.string().email().optional(),
      phone: z.string().regex(/^\+[0-9]{1,3}\s*[0-9]{1,15}$/).optional(),
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
      phone: z.string().regex(/^\+[0-9]{1,3}\s*[0-9]{1,15}$/).optional(),
      streetNumber: z.string().max(10).optional(),
      address1: z.string().max(100).optional(),
      address2: z.string().max(100).optional(),
      city: z.string().max(50).optional(),
      postalCode: z.string().max(10).optional(),
      country: z.string().max(50).optional(),
    })
    .optional(),
  cartProducts: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ).optional(),
  cartGiftcards: z.array(
    z.object({
      amount: z.number().min(0),
      quantity: z.number().min(1),
    })
  ).optional(),
  wishlistProducts: z.array(z.string()).optional(),
  emailMarketingConsent: z.boolean().optional(),
});
export type FieldsUpdateCustomerDTO = z.infer<typeof updateCustomerSchema>;