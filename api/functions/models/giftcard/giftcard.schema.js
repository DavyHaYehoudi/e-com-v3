import { addYears } from "date-fns";
import mongoose, { Schema } from "mongoose";
const GiftCardUsageSchema = new Schema(
  {
    usedByCustomerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amountUsed: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
// Fonction pour générer un code aléatoire
const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const GiftCardSchema = new Schema(
  {
    firstHolderId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      default: generateRandomCode, // Génère un code aléatoire par défaut
    },
    initialValue: { type: Number, required: true },
    balance: { type: Number, required: true },
    isIssuedByAdmin: { type: Boolean, default: false },
    expirationDate: {
      type: Date,
      default: () => addYears(new Date(), 1),
      set: (val) => (typeof val === "string" ? new Date(val) : val),
    },
    usageHistory: { type: [GiftCardUsageSchema], default: [] }, // Historique des usages
  },
  {
    timestamps: true,
  }
);
export const GiftCardModel = mongoose.model("GiftCard", GiftCardSchema);
