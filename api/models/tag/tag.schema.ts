import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour le tag
export interface TagType extends Document {
  label: string;
}

// Définition du schéma Mongoose
const TagSchema = new Schema<TagType>({
  label: {
    type: String,
    required: true,
    unique: true, // Optionnel, pour garantir l'unicité des labels
    trim: true, // Supprime les espaces inutiles au début/à la fin
  },
});

// Création du modèle Mongoose
const Tag = mongoose.model<TagType>("Tag", TagSchema);

export default Tag;
