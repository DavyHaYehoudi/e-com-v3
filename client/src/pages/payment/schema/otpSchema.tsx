import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "L'OTP doit comporter 6 caractères" })
    .regex(/^\d+$/, { message: "L'OTP doit être uniquement numérique" })
});

export type OTPFormValues = z.infer<typeof otpSchema>;
