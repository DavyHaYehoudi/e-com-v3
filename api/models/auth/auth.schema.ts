import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuth extends Document {
    digitCode: string;
    email: string;
    expiresAt: Date;
}

// Définir le schéma Mongoose
const AuthSchema: Schema = new Schema<IAuth>(
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
const Auth: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);

export default Auth;
  