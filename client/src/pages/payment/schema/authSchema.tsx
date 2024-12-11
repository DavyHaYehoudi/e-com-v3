import * as z from "zod";

export const AuthSchema = z
  .object({
    email: z
      .string()
      .email("Veuillez entrer une adresse email valide."),
    confirmEmail: z
      .string()
      .email("Veuillez entrer une adresse email valide."),
    otp: z
      .string()
      .min(6, { message: "Le code OTP doit contenir exactement 6 caractères." })
      .max(6, { message: "Le code OTP doit contenir exactement 6 caractères." })
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Les emails doivent correspondre.",
    path: ["confirmEmail"],
  });

export type AuthFormValues = z.infer<typeof AuthSchema>;
