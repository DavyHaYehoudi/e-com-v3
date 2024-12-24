import mongoose, { Schema, Document, Types } from "mongoose";

// Interface du document Product
export interface ProductDocument extends Document {
  name: string;
  description: string;
  heroImage: string;
  promotionPercentage: number;
  promotionEndDate: string | Date | null;
  continueSelling: boolean;
  quantityInStock: number;
  price: number;
  newUntil: string | Date | null;
  isPublished: boolean;
  cashback: number;
  collections: Types.ObjectId[];
  categories: Types.ObjectId[];
  tags: Types.ObjectId[];
  variants: {
    combination: string;
    mainImage: string;
    secondaryImages: string[];
  }[];
  isStar: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schéma du modèle Product
const ProductSchema = new Schema<ProductDocument>(
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
    isStar: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  ProductSchema
);
