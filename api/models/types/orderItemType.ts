import mongoose from "mongoose";
export interface OrderItemType {
  productId: mongoose.Types.ObjectId | string;
  variant: string | null;
  customerId: mongoose.Types.ObjectId | string;
  articleNumber: number;
  heroImage: string;
  priceBeforePromotionOnProduct: number;
  promotionPercentage: number;
  cashbackEarned: number;
  exchangeNumber: number | null;
  exchangeAt: string | null;
  refundNumber: number | null;
  refundAt: string | null;
  refundAmount: number | null;
  returnNumber: number | null;
  returnAt: string | null;
}
