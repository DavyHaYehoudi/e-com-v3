import mongoose, { Schema } from "mongoose";
// Schéma Mongoose
const PaymentStatusSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true, // Assure que chaque statut a un numéro unique
      trim: true, // Supprime les espaces inutiles au début/fin
    },
    label: {
      type: String,
      required: true,
      unique: true, // Assure que chaque statut a un nom unique
      trim: true, // Supprime les espaces inutiles au début/fin
    },
    color: {
      type: String,
      required: true,
      trim: true, // Supprime les espaces inutiles
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);
// Modèle Mongoose
export const PaymentStatusModel = mongoose.model(
  "PaymentStatus",
  PaymentStatusSchema
);
