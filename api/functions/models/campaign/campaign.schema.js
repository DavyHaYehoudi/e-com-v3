import mongoose, { Schema } from "mongoose";
// Schéma de la collection Campaign
const CampaignSchema = new Schema(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["prepared", "sent"], default: "prepared" },
    sendDate: { type: Date, default: null },
    totalSent: { type: Number, default: 0 },
    recipients: { type: [String], default: [] }, // Liste des emails
    imageUrl: { type: String, default:""}
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);
export const CampaignModel = mongoose.model("Campaign", CampaignSchema);
