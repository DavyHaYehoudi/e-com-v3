import { CartGiftcardsToBuyFrontType } from "../giftcard/GiftcardTypes";

export interface CartProductsToBuyFrontType {
  productId: string;
  quantity: number;
  variant: string | null;
  name: string;
  heroImage: string;
  newUntil: string | null;
  price: number;
  promotionPercentage: number;
  promotionEndDate: Date | null;
  cashback: number;
}

export interface CartCustomerType {
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
}
