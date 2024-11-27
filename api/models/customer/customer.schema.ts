import mongoose, { Schema, Model } from "mongoose";
import { ICustomer } from "../../repositories/customer/customer.dao";
import { GiftcardInCartType, ProductInCartType } from "../types/cartType";
import { CashbackType } from "../types/cashbackType";

// Sous-schéma pour cartProduct
const CartProductSchema = new Schema<ProductInCartType>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});
// Sous-schéma pour cartGiftcard
const CartGiftCardSchema = new Schema<GiftcardInCartType>({
  amount: { type: Number, required: true, min: 0 }, // Montant positif requis
  quantity: { type: Number, required: true, min: 1 }, // Quantité minimale de 1
});
// Sous-schéma pour le cashback
const CashbackSchema = new Schema<CashbackType>({
  cashbackEarned: { type: Number, required: true, min: 0 }, // Cashback gagné doit être >= 0
  cashbackSpent: { type: Number, required: true, min: 0 }, // Cashback dépensé doit être >= 0
  label: {
    type: String,
    required: true,
    enum: ["loyalty", "birthday", "order", "other", "review", "referral"], // Énumération
  },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", default: null }, // Référence facultative
  reviewId: { type: Schema.Types.ObjectId, ref: "Review", default: null }, // Référence facultative
});
// Définir le schéma Mongoose
const CustomerSchema: Schema = new Schema<ICustomer>(
  {
    role: {
      type: String,
      default: "customer",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/, // Validation de format
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [20, "Le prénom ne doit pas dépasser 20 caractères."],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, "Le nom ne doit pas dépasser 20 caractères."],
    },
    shippingAddress: {
      company: {
        type: String,
        trim: true,
        maxlength: [
          20,
          "Le nom de la société ne doit pas dépasser 20 caractères.",
        ],
      },
      firstName: {
        type: String,
        trim: true,
        maxlength: [20, "Le prénom ne doit pas dépasser 20 caractères."],
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: [20, "Le nom ne doit pas dépasser 20 caractères."],
      },
      email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/, // Validation de format
      },
      phone: {
        type: String,
        match: /^\+[0-9]{1,3}\s*[0-9]{1,15}$/, // Validation de format
      },
      streetNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Le numéro de rue ne doit pas dépasser 10 caractères."],
      },
      address1: {
        type: String,
        trim: true,
        maxlength: [100, "L'adresse ne doit pas dépasser 100 caractères."],
      },
      address2: {
        type: String,
        trim: true,
        maxlength: [100, "L'adresse ne doit pas dépasser 100 caractères."],
      },
      city: {
        type: String,
        trim: true,
        maxlength: [
          50,
          "Le nom de la ville ne doit pas dépasser 50 caractères.",
        ],
      },
      postalCode: {
        type: String,
        trim: true,
        maxlength: [10, "Le code postal ne doit pas dépasser 10 caractères."],
      },
      country: {
        type: String,
        default: "France",
        trim: true,
        maxlength: [50, "Le nom du pays ne doit pas dépasser 50 caractères."],
      },
    },
    billingAddress: {
      company: {
        type: String,
        trim: true,
        maxlength: [
          20,
          "Le nom de la société ne doit pas dépasser 20 caractères.",
        ],
      },
      firstName: {
        type: String,
        trim: true,
        maxlength: [20, "Le prénom ne doit pas dépasser 20 caractères."],
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: [20, "Le nom ne doit pas dépasser 20 caractères."],
      },
      email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/, // Validation de format
      },
      phone: {
        type: String,
        match: /^\+[0-9]{1,3}\s*[0-9]{1,15}$/, // Validation de format
      },
      streetNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Le numéro de rue ne doit pas dépasser 10 caractères."],
      },
      address1: {
        type: String,
        trim: true,
        maxlength: [100, "L'adresse ne doit pas dépasser 100 caractères."],
      },
      address2: {
        type: String,
        trim: true,
        maxlength: [100, "L'adresse ne doit pas dépasser 100 caractères."],
      },
      city: {
        type: String,
        trim: true,
        maxlength: [
          50,
          "Le nom de la ville ne doit pas dépasser 50 caractères.",
        ],
      },
      postalCode: {
        type: String,
        trim: true,
        maxlength: [10, "Le code postal ne doit pas dépasser 10 caractères."],
      },
      country: {
        type: String,
        default: "France",
        trim: true,
        maxlength: [50, "Le nom du pays ne doit pas dépasser 50 caractères."],
      },
    },
    cartProduct: {
      type: [CartProductSchema],
      default: [],
    },
    cartGiftcard: {
      type: [CartGiftCardSchema], // Tableau de sous-schémas
      default: [],
    },
    wishlistProduct: {
      type: [String],
      default: [],
    },
    cashback: {
      type: [CashbackSchema],
      default: [],
    },
    phone: {
      type: String,
      match: /^\+[0-9]{1,3}\s*[0-9]{1,15}$/, // Validation de format
    },
    avatarUrl: {
      type: String,
      default: "https://via.placeholder.com/150x150",
    },
    emailMarketingConsent: {
      type: Boolean,
      default: false,
    },
    ordersTotalCount: {
      type: Number,
      default: 0,
    },
    ordersTotalAmount: {
      type: Number,
      default: 0,
    },
    birthdate: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Créer le modèle Mongoose
const Customer: Model<ICustomer> = mongoose.model<ICustomer>(
  "Customer",
  CustomerSchema
);

export default Customer;
