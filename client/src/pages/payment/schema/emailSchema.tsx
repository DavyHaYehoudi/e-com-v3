import { z } from "zod";

export const emailSchema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    confirmEmail: z.string().email({ message: "Confirmation email invalide" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Les emails doivent correspondre.",
    path: ["confirmEmail"],
  });

export type EmailFormValues = z.infer<typeof emailSchema>;
