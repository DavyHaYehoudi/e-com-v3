import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Seuls les chiffres sont acceptés')
    .min(10, 'Le numéro de téléphone doit comporter au moins 10 chiffres')
    .max(15, 'Le numéro de téléphone ne doit pas dépasser 15 chiffres'),
  message: z.string().min(10, 'Le message doit comporter au moins 10 caractères'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
