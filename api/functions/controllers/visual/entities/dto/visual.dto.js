import { z } from "zod";

export const homePageVisualZodSchema = z.object({
  visual1: z.string().url(),
  visual2: z.string().url(),
  visual3: z.string().url().nullable().optional(),
  visual4: z.string().url().nullable().optional(),
});
export const createrPageVisualZodSchema = z.object({
  visual1: z.string().url(),
});
export const giftcardVisualZodSchema = z.object({
  visual1: z.string().url(),
});

export const visualsZodSchema = z.object({
  homePage: homePageVisualZodSchema.optional(),
  createrPage: createrPageVisualZodSchema.optional(),
  giftcard: giftcardVisualZodSchema.optional(),
});
