import mongoose from "mongoose";

export interface CashbackType {
  cashbackEarned: number;
  cashbackSpent: number;
  label: "loyalty" | "birthday" | "order" | "other" | "review" | "referral";
  orderId: mongoose.Types.ObjectId;
  reviewId: mongoose.Types.ObjectId;
}
