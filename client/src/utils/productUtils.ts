import { ProductDBType, VariantProductType } from "@/types/ProductTypes";
import { isAfter } from "date-fns";

export const isProductOnSale = (
  promotionPercentage: number,
  promotionEndDate: Date | string | null
): boolean => {
  if (!promotionEndDate) return false; // Pas de date, pas de promotion

  const today = new Date();
  const endDate = new Date(promotionEndDate);

  // Vérifie si la promotion est toujours valide
  return promotionPercentage > 0 && isAfter(endDate, today);
};

export const isProductNew = (newUntil: string | null): boolean => {
  if (!newUntil) return false;

  const today = new Date();
  const newUntilDate = new Date(newUntil);

  return isAfter(newUntilDate, today);
};

export const priceProductAfterDiscount = (product: ProductDBType): number => {
  return product.promotionPercentage
    ? product.price - (product.price * product.promotionPercentage) / 100
    : product.price;
};
export const canContinueSelling = (product: ProductDBType): boolean => {
  return (
    product.continueSelling ||
    (!product.continueSelling && product.quantityInStock > 0)
  );
};
export const formatPromotionDate = (discountEndDate: string | Date): string => {
  const now: Date = new Date();
  const promoDate: Date = new Date(discountEndDate);

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
export const filterVariants = (
  product: ProductDBType
): VariantProductType[] => {
  // Si un seul variant, c'est alors celui par défaut ajouté lors de la création du produit et l'afficher.
  // Si plus d'un variant, ne pas afficher le 1er qui est celui ajouté par défaut lors de la création du produit
  return product.variants.length > 1
    ? product.variants.slice(1)
    : product.variants;
};
