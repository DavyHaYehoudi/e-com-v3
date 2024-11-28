import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour une catégorie
export interface CategoryType extends Document {
  label: string;
  products: string[];
}

// Schéma pour une catégorie
const CategorySchema = new Schema<CategoryType>(
  {
    label: { type: String, required: true, trim: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryType>("Category", CategorySchema);
export default Category;
