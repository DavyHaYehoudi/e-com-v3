import mongoose, { Schema } from "mongoose";
// Schéma du modèle Product
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    promotionPercentage: { type: Number, default: 0 },
    promotionEndDate: { type: Date, default: null },
    continueSelling: { type: Boolean, default: false },
    quantityInStock: { type: Number, required: true },
    price: { type: Number, required: true },
    newUntil: { type: Date, default: new Date() },
    isPublished: { type: Boolean, default: false },
    cashback: { type: Number, default: 0 },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    variants: [
      {
        combination: { type: String, required: true },
        mainImage: { type: String, required: true },
        secondaryImages: [{ type: String }],
      },
    ],
    numberOfSales: { type: Number, default: 0 },
    isStar: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const ProductModel = mongoose.model("Product", ProductSchema);
