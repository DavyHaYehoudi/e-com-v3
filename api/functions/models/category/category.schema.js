import mongoose, { Schema } from "mongoose";
// Schéma pour une catégorie
const CategorySchema = new Schema(
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
const Category = mongoose.model("Category", CategorySchema);
export default Category;
