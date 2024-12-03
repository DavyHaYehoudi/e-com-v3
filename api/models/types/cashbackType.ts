import mongoose from "mongoose";

export interface CashbackType {
  cashbackEarned: number;
  cashbackSpent: number;
  label:
    | "loyalty"
    | "birthday"
    | "order"
    | "other"
    | "review"
    | "referral"
    | "correction";
  orderNumber: string | null;
  reviewId: mongoose.Types.ObjectId | null;
}
