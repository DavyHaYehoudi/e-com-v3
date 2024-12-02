import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: Date | string | String): string => {
  // Convertir un objet String en une chaîne primitive
  const normalizedDate = typeof date === "string" ? date : date.toString();

  // Parser la date en objet Date
  const parsedDate = date instanceof Date ? date : new Date(normalizedDate);

  // Retourner la date formatée
  return format(parsedDate, "dd MMM yyyy", { locale: fr });
};
