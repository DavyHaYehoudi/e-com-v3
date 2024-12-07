import mongoose from "mongoose";

export interface ProductInCartType {
  productId: mongoose.Types.ObjectId | string;
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
export interface GiftcardInCartType {
  idTemp: number;
  amount: number;
  quantity: number;
}
export interface ProductInWishlistType {
  productId: mongoose.Types.ObjectId | string;
}
