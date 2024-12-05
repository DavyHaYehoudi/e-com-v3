import { CartGiftCard, CartItemsType } from "@/app/(public)/types/CartTypes";
import { GiftcardToUseType } from "@/app/(public)/types/GiftcardToUseTypes";
import { ProductCartGiftcards } from "@/app/(public)/types/ProductTypes";

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
export const calculateTotalDiscountCart = (items: CartItemsType[]) => {
  return items.reduce((sum, product) => {
    if (product.discount_percentage) {
      return (
        sum +
        (product.price * product.quantityInCart * product.discount_percentage) /
          100
      );
    }
    return sum;
  }, 0);
};
export const calculateTotalCashbackCartToEarn = (items: CartItemsType[]) => {
  return items.reduce((sum, product) => {
    if (product.cash_back) {
      return sum + product.quantityInCart * product.cash_back;
    }
    return sum;
  }, 0);
};
export const calculateTotalCartBeforeDiscount = (
  items: CartItemsType[],
  giftcards: ProductCartGiftcards[] = []
) => {
  const giftcardsTotalAmount = calculateTotalAmountGiftCardToBuy(giftcards);
  return items.reduce((sum, product) => {
    return sum + product.price * product.quantityInCart;
  }, giftcardsTotalAmount || 0);
};
export const calculateTotalWeightCart = (items: CartItemsType[]) => {
  return items.reduce((sum, product) => {
    return sum + (product.weight || 0) * product.quantityInCart;
  }, 0);
};
export const calculateTotalAmountGiftCardToBuy = (
  giftcards: ProductCartGiftcards[] = []
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
  giftcards: GiftcardToUseType[]
) => {
  return giftcards.reduce((sum, giftcard) => sum + (giftcard.balance ?? 0), 0);
};
export const calculateTotalCartAfterDiscountAndGiftcardToUse = (
  items: CartItemsType[],
  deliveryPrice: number,
  giftcardsToBuy: CartGiftCard[] = [],
  giftcardsToUse: GiftcardToUseType[] = []
) => {
  return Math.max(
    0,
    Number(calculateTotalCartBeforeDiscount(items)) -
      Number(calculateTotalDiscountCart(items)) +
      deliveryPrice +
      Number(calculateTotalAmountGiftCardToBuy(giftcardsToBuy)) -
      Number(calculateTotalAmountGiftCardToUse(giftcardsToUse))
  );
};
export const calculateCodePromoDiscountOnCartTotal = (
  items: CartItemsType[],
  giftcards: ProductCartGiftcards[],
  percentage: number
) => {
  return Math.max(
    0,
    ((calculateTotalCartBeforeDiscount(items, giftcards) -
      calculateTotalDiscountCart(items)) *
      percentage) /
      100
  );
};
export const calculateTotalCartAfterCashback = (
  items: CartItemsType[],
  deliveryPrice: number,
  giftcardsToBuy: CartGiftCard[] = [],
  giftcardsToUse: GiftcardToUseType[] = [],
  percentage: number,
  selectedCashback: number | null
) => {
  return Math.max(
    0,
    calculateTotalCartAfterDiscountAndGiftcardToUse(
      items,
      deliveryPrice,
      giftcardsToBuy,
      giftcardsToUse
    ) -
      calculateCodePromoDiscountOnCartTotal(items, giftcardsToBuy, percentage) -
      (selectedCashback ?? 0)
  );
};
