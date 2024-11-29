import mongoose, { Schema, Document, Model } from "mongoose";

// Interface TypeScript pour un code promo
export interface PromocodeType extends Document {
  code: string;
  promocodePercentage: number;
  startDate: String;
  endDate: String;
}

// Schéma Mongoose
const PromocodeSchema: Schema<PromocodeType> = new Schema({
  code: { type: String, required: true, unique: true },
  promocodePercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

// Modèle Mongoose
export const Promocode: Model<PromocodeType> = mongoose.model<PromocodeType>(
  "Promocode",
  PromocodeSchema
);
