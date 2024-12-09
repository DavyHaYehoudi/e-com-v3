import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";
import {
  CartGiftcardsToBuyFrontType,
  GiftcardToUseFrontType,
} from "@/types/giftcard/GiftcardTypes";

export const calculateTotalPriceByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    const discountedPrice = price - discountAmount;
    return quantity * discountedPrice;
  }

  // Si pas de réduction, retourne le prix normal
  return quantity * price;
};
export const calculateTotalDiscountByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    return quantity * discountAmount;
  }
  // Pas de réduction, donc pas de discount
  return 0;
};
export const calculateTotalDiscountCart = (
  products: CartProductsToBuyFrontType[]
) => {
  return products.reduce((sum, product) => {
    if (product.promotionPercentage) {
      return (
        sum +
        (product.price * product.quantity * product.promotionPercentage) / 100
      );
    }
    return sum;
  }, 0);
};
export const calculateTotalCashbackCartToEarn = (
  products: CartProductsToBuyFrontType[]
) => {
  return products.reduce((sum, product) => {
    if (product.cashback) {
      return sum + product.quantity * product.cashback;
    }
    return sum;
  }, 0);
};
export const calculateTotalCartBeforeDiscount = (
  products: CartProductsToBuyFrontType[],
  giftcards: CartGiftcardsToBuyFrontType[] = []
) => {
  const giftcardsTotalAmount = calculateTotalAmountGiftCardToBuy(giftcards);
  return products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, giftcardsTotalAmount || 0);
};
export const calculateTotalAmountGiftCardToBuy = (
  giftcards: CartGiftcardsToBuyFrontType[] = []
) => {
  return (
    giftcards &&
    giftcards.length > 0 &&
    giftcards.reduce(
      (sum, giftcard) => sum + giftcard.amount * giftcard.quantity,
      0
    )
  );
};
export const calculateTotalAmountGiftCardToUse = (
  giftcards: GiftcardToUseFrontType[]
) => {
  return giftcards.reduce((sum, giftcard) => sum + (giftcard.balance ?? 0), 0);
};
export const calculateTotalCartAfterDiscountAndGiftcardToUse = (
  products: CartProductsToBuyFrontType[],
  giftcardsToBuy: CartGiftcardsToBuyFrontType[] = [],
  giftcardsToUse: GiftcardToUseFrontType[] = []
) => {
  return Math.max(
    0,
    Number(calculateTotalCartBeforeDiscount(products)) -
      Number(calculateTotalDiscountCart(products)) +
      Number(calculateTotalAmountGiftCardToBuy(giftcardsToBuy)) -
      Number(calculateTotalAmountGiftCardToUse(giftcardsToUse))
  );
};
export const calculateCodePromoDiscountOnCartTotal = (
  products: CartProductsToBuyFrontType[],
  giftcards: CartGiftcardsToBuyFrontType[],
  percentage: number
) => {
  return Math.max(
    0,
    ((calculateTotalCartBeforeDiscount(products, giftcards) -
      calculateTotalDiscountCart(products)) *
      percentage) /
      100
  );
};
export const calculateTotalCartAfterCashback = (
  products: CartProductsToBuyFrontType[],
  giftcardsToBuy: CartGiftcardsToBuyFrontType[] = [],
  giftcardsToUse: GiftcardToUseFrontType[] = [],
  percentage: number,
  selectedCashback: number | null
) => {
  return Math.max(
    0,
    calculateTotalCartAfterDiscountAndGiftcardToUse(
      products,
      giftcardsToBuy,
      giftcardsToUse
    ) -
      calculateCodePromoDiscountOnCartTotal(
        products,
        giftcardsToBuy,
        percentage
      ) -
      (selectedCashback ?? 0)
  );
};
