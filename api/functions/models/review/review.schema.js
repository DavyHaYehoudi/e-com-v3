import mongoose, { Schema } from "mongoose";
// Schéma Mongoose
const ReviewSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", default: null },
    productId: { type: Schema.Types.ObjectId, ref: "Product", default: null },
    reviewText: { type: String, required: true, maxlength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "refused"], // Énumération
    },
  },
  { timestamps: true }
);
// Export du modèle
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
