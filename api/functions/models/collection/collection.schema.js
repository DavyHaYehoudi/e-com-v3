import mongoose, { Schema } from "mongoose";
// Schéma pour une collection
const CollectionSchema = new Schema(
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
const Collection = mongoose.model("Collection", CollectionSchema);
export default Collection;
