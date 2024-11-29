import mongoose, { Schema, Document } from "mongoose";

// Interface du document Campaign
export interface CampaignDocument extends Document {
  subject: string;
  content: string;
  status: "prepared" | "sent";
  sendDate?: Date;
  totalSent: number;
  recipients: string[];
}

// Schéma de la collection Campaign
const CampaignSchema = new Schema<CampaignDocument>(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["prepared", "sent"], default: "prepared" },
    sendDate: { type: Date, default: null },
    totalSent: { type: Number, default: 0 },
    recipients: { type: [String], default: [] }, // Liste des emails
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

export const CampaignModel = mongoose.model<CampaignDocument>(
  "Campaign",
  CampaignSchema
);
