import mongoose, { Schema, Document } from "mongoose";

// Interface pour typer les documents Mongoose
export interface IReview extends Document {
  customerId: Schema.Types.ObjectId; // ID du consommateur (référence à un client)
  orderId?: Schema.Types.ObjectId; // ID de la commande (optionnel)
  productId?: Schema.Types.ObjectId; // ID du produit (optionnel)
  reviewText: string; // Texte du commentaire
  rating: number; // Note (1 à 5 étoiles)
  isValidateByAdmin: boolean; // Indique si le commentaire est validé par l'admin
}

// Schéma Mongoose
const ReviewSchema = new Schema<IReview>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", default: null },
    productId: { type: Schema.Types.ObjectId, ref: "Product", default: null },
    reviewText: { type: String, required: true, maxlength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    isValidateByAdmin: { type: Boolean, default: false },
  },

  { timestamps: true }
);

// Export du modèle
const Review = mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
