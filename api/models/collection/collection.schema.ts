import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour une collection
export interface CollectionType extends Document {
  label: string;
  products: string[];
}

// Schéma pour une collection
const CollectionSchema = new Schema<CollectionType>(
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

const Collection = mongoose.model<CollectionType>(
  "Collection",
  CollectionSchema
);
export default Collection;
