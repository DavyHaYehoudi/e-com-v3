import mongoose from "mongoose";

export interface CashbackType {
  cashbackEarned: number;
  cashbackSpent: number;
  label: "loyalty" | "birthday" | "order" | "other" | "review" | "referral";
  orderNumber: string | null;
  reviewId: mongoose.Types.ObjectId;
}
