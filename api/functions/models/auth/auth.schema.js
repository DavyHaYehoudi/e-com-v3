import mongoose, { Schema } from "mongoose";
// Définir le schéma Mongoose
const AuthSchema = new Schema(
  {
    digitCode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/, // Validation de format
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);
// Créer le modèle Mongoose
const Auth = mongoose.model("Auth", AuthSchema);
export default Auth;
