import mongoose from "mongoose";
export interface OrderItemType {
  productId: mongoose.Types.ObjectId | string;
  name: string;
  variant: string | null;
  customerId: mongoose.Types.ObjectId | string;
  articleNumber: number;
  heroImage: string;
  priceBeforePromotionOnProduct: number;
  promotionPercentage: number;
  promotionEndDate: Date | null;
  cashbackEarned: number;
  exchangeNumber: number | null;
  exchangeAt: string | null;
  refundNumber: number | null;
  refundAt: string | null;
  refundAmount: number | null;
  returnNumber: number | null;
  returnAt: string | null;
}
