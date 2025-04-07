import mongoose, { Schema } from "mongoose";

const VisualSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ["homePage", "createrPage"], // extensible si besoin
      unique: true, // 1 seul document par page
    },
    images: {
      image1: { type: String,default: null },
      image2: { type: String ,default: null},
      image3: { type: String, default: null },
      image4: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const VisualModel = mongoose.model("Visual", VisualSchema);
export default VisualModel;
