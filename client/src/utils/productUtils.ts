import { isAfter } from "date-fns";
import { MasterProductsType, Product } from "../types/ProductTypes";

/**
 * Détermine si un produit est en promotion.
 * @param discountPercentage Le pourcentage de la promotion
 * @returns true si le produit est en promotion, false sinon
 */
export const isProductOnSale = (discountPercentage: number | null): boolean => {
  return discountPercentage !== null && discountPercentage > 0;
};

/**
 * Détermine si un produit est encore considéré comme "nouveau".
 * @param newUntil La date limite jusqu'à laquelle le produit est considéré comme nouveau
 * @returns true si le produit est encore nouveau, false sinon
 */
export const isProductNew = (newUntil: string | null): boolean => {
  if (!newUntil) return false;

  const today = new Date();
  const newUntilDate = new Date(newUntil);

  return isAfter(newUntilDate, today);
};

export const priceProductAfterDiscount = (
  product: Product | MasterProductsType
): number => {
  return product.discount_percentage
    ? product.price - (product.price * product.discount_percentage) / 100
    : product.price;
};
export const canContinueSelling = (
  product: Product | MasterProductsType
): boolean => {
  return (
    product.continue_selling ||
    (!product.continue_selling && product.quantity_in_stock > 0)
  );
};
export const formatPromotionDate = (discount_end_date: string): string => {
  const now: Date = new Date();
  const promoDate: Date = new Date(discount_end_date);

  // Vérifier si la promotion est déjà terminée
  if (promoDate <= now) {
    return ""; // Ou retourne un message comme "Promotion terminée"
  }

  // Calcul du temps restant en millisecondes
  const timeDiff: number = promoDate.getTime() - now.getTime();

  // Constantes pour la conversion du temps
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  const oneMinute = 1000 * 60;

  // Gestion du cas où le temps restant est inférieur à une heure
  if (timeDiff <= oneHour) {
    const minutesLeft = Math.floor(timeDiff / oneMinute);
    return `Encore ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}`;
  }
  // Gestion du cas où le temps restant est inférieur à un jour
  else if (timeDiff <= oneDay) {
    const hoursLeft = Math.floor(timeDiff / oneHour);
    return `Encore ${hoursLeft} heure${hoursLeft > 1 ? "s" : ""}`;
  }
  // Gestion du cas où le temps restant est inférieur à une semaine
  else if (timeDiff <= oneDay * 7) {
    const daysLeft = Math.floor(timeDiff / oneDay);
    return `Plus que ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`;
  }
  // Si la promotion dure plus longtemps, afficher la date de fin
  else {
    return `Jusqu'au ${promoDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;
  }
};
