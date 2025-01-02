import { CartGiftcardsInCustomerDB, CartProductsInCustomerDB } from "./CustomerTypes";
import { CartGiftcardsToBuyFrontType } from "./GiftcardTypes";

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

export interface CartCustomerFrontType {
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
}
export interface CartCustomerDBType{
    cartProducts: CartProductsInCustomerDB[];
    cartGiftcards: CartGiftcardsInCustomerDB[];
}