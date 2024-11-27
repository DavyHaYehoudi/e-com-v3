import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuth extends Document {
    digitCode: string;
    email: string;
    expiresAt: string;
}

// Définir le schéma Mongoose
const AuthSchema: Schema = new Schema<IAuth>(
  {
    digitCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: [6, "Le digitcode doit être de 6 chiffres."],
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/, // Validation de format
    },
    expiresAt: {
      type: String,
      enum: ["admin", "customer"], // Limitation des valeurs possibles
      default: "customer",
    },
  },
  { timestamps: true }
);

// Créer le modèle Mongoose
const Auth: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);

export default Auth;
  