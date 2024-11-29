import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour une catégorie
export interface CategoryType extends Document {
  label: string;
  products: string[];
}

// Schéma pour une catégorie
const CategorySchema = new Schema<CategoryType>(
  {
    label: {
      type: String,
      required: true,
      unique: true, // Optionnel, pour garantir l'unicité des labels
      trim: true, // Supprime les espaces inutiles au début/à la fin
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<CategoryType>("Category", CategorySchema);
export default Category;
