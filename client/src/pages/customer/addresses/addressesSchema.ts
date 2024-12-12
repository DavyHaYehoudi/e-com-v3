import * as z from "zod";

export const AddressesSchema = z.object({
  company: z.string(),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  phone: z
    .string()
    .regex(/^\d+$/, "Seuls les chiffres sont acceptés")
    .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
    .max(15, "Le numéro de téléphone ne doit pas dépasser 15 chiffres")
    ,
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide" }),
  street_number: z
    .string()
    .min(1, "Numéro requis")
    .max(6, "Limité à 6 caractères")
    ,
  address1: z.string().min(1, "Adresse requise"),
  address2: z.string(),
  postal_code: z
    .string()
    .min(1, "Code postal requis")
    .max(6, "Limité à 6 caractères")
    ,
  city: z.string().min(1, "Ville requise"),
  country: z.string(),
});

export type AddressesFormValues = z.infer<typeof AddressesSchema>;