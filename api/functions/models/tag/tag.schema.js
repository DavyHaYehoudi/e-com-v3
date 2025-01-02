import mongoose, { Schema } from "mongoose";
// Définition du schéma Mongoose
const TagSchema = new Schema(
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
// Création du modèle Mongoose
const Tag = mongoose.model("Tag", TagSchema);
export default Tag;
