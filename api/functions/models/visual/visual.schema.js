import mongoose, { Schema } from "mongoose";

const VisualSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ["homePage", "createrPage", "giftcard"], // extensible si besoin
      unique: true, // 1 seul document par page
    },
    images: {
      visual1: { type: String, default: null },
      visual2: { type: String, default: null },
      visual3: { type: String, default: null },
      visual4: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const VisualModel = mongoose.model("Visual", VisualSchema);
export default VisualModel;
