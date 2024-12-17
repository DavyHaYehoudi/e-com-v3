import mongoose, { Schema, Document, Model } from "mongoose";

// Interface TypeScript pour un code promo
export interface PromocodeType extends Document {
  code: string;
  promocodePercentage: number;
  startDate: String | Date;
  endDate: String | Date;
}

// Schéma Mongoose
const PromocodeSchema: Schema<PromocodeType> = new Schema({
  code: { type: String, required: true, unique: true },
  promocodePercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Modèle Mongoose
export const Promocode: Model<PromocodeType> = mongoose.model<PromocodeType>(
  "Promocode",
  PromocodeSchema
);
