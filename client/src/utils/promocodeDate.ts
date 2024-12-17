import { isAfter, isBefore } from "date-fns";

/**
 * Vérifie si un code promo est d'actualité en fonction de ses dates.
 * @param startDate - La date de début de validité du code promo (Date ou chaîne).
 * @param endDate - La date de fin de validité du code promo (Date ou chaîne).
 * @returns `true` si le code promo est valide aujourd'hui, sinon `false`.
 */
export const isPromocodeActive = (startDate: Date | string, endDate: Date | string): boolean => {
  const today = new Date();

  // Convertit les chaînes en objets Date si nécessaire
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Vérifie si la date du jour est après ou égale à la date de début
  const isAfterStart = isAfter(today, start) || today.toDateString() === start.toDateString();

  // Vérifie si la date du jour est avant ou égale à la date de fin
  const isBeforeEnd = isBefore(today, end) || today.toDateString() === end.toDateString();

  return isAfterStart && isBeforeEnd;
};
