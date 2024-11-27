import mongoose from "mongoose";

export interface ProductInCartType {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}
export interface GiftcardInCartType {
  amount: number;
  quantity: number;
}
export interface ProductInWishlistType {
  productId: mongoose.Types.ObjectId;
}
