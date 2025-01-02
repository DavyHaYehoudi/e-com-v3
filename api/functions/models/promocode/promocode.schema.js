import mongoose, { Schema } from "mongoose";
// Schéma Mongoose
const PromocodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  promocodePercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
// Modèle Mongoose
export const Promocode = mongoose.model("Promocode", PromocodeSchema);
