import { z } from "zod";

export const homePageVisualZodSchema = z.object({
  image1: z.string().url(),
  image2: z.string().url(),
  image3: z.string().url().nullable().optional(),
  image4: z.string().url().nullable().optional(),
});
export const createrPageVisualZodSchema = z.object({
  image1: z.string().url(),
});

export const visualsZodSchema = z.object({
  homePage: homePageVisualZodSchema.optional(),
  createrPage: createrPageVisualZodSchema.optional(),
});
