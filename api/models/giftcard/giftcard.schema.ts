import { addYears } from "date-fns";
import mongoose, { Schema, Document } from "mongoose";

interface GiftCardUsage {
  usedByCustomerId: Schema.Types.ObjectId;
  amountUsed: number;
  usedAt: Date;
  usedOrderId: Schema.Types.ObjectId;
}

export interface GiftCardDocument extends Document {
  firstHolderId: Schema.Types.ObjectId;
  code: string;
  initialValue: number;
  balance: number;
  isIssuedByAdmin: boolean;
  expirationDate: String | Date;
  buyOrderId: Schema.Types.ObjectId;
  usageHistory: GiftCardUsage[];
  createdAt: Date;
  updatedAt: Date;
}

const GiftCardUsageSchema = new Schema<GiftCardUsage>(
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
const generateRandomCode = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const GiftCardSchema = new Schema<GiftCardDocument>(
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
      type: String,
      default: () => addYears(new Date(), 1), // Définit la date d'expiration par défaut à un an à compter de la création
    },
    usageHistory: { type: [GiftCardUsageSchema], default: [] }, // Historique des usages
  },
  {
    timestamps: true,
  }
);

export const GiftCardModel = mongoose.model<GiftCardDocument>(
  "GiftCard",
  GiftCardSchema
);
