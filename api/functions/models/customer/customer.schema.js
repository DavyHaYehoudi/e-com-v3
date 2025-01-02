import mongoose, { Schema } from "mongoose";
// Sous-schéma pour cartProduct
const CartProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  variant: { type: String, default: null },
  name: { type: String, required: true },
  heroImage: { type: String, required: true },
  newUntil: { type: String, default: null },
  price: { type: Number, required: true, min: 0 },
  promotionPercentage: { type: Number, default: 0 },
  promotionEndDate: { type: Date, default: null },
  cashback: { type: Number, default: 0 },
});
// Sous-schéma pour cartGiftcard
const CartGiftCardSchema = new Schema({
  idTemp: { type: Number, required: true },
  amount: { type: Number, required: true, min: 0 }, // Montant positif requis
  quantity: { type: Number, required: true, min: 1 }, // Quantité minimale de 1
});
// Sous-schéma pour le cashback
const CashbackSchema = new Schema(
  {
    cashbackEarned: { type: Number, required: true, min: 0 }, // Cashback gagné doit être >= 0
    cashbackSpent: { type: Number, required: true, min: 0 }, // Cashback dépensé doit être >= 0
    label: {
      type: String,
      required: true,
      enum: [
        "loyalty",
        "birthday",
        "order",
        "other",
        "review",
        "referral",
        "correction",
      ], // Énumération
    },
    orderNumber: { type: String, default: null }, // Référence facultative
  },
  { timestamps: true }
);
// Définir le schéma Mongoose
const CustomerSchema = new Schema(
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
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, "Le nom ne doit pas dépasser 20 caractères."],
      default: "",
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
        match: /^\S+@\S+\.\S+$/, // Validation de format
      },
      phone: {
        type: String,
        match: /^0[1-9][0-9]{8}$/, // Numéro de téléphone français au format simple
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
        match: /^\S+@\S+\.\S+$/, // Validation de format
      },
      phone: {
        type: String,
        match: /^0[1-9][0-9]{8}$/, // Numéro de téléphone français au format simple
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
    cartProducts: {
      type: [CartProductSchema],
      default: [],
    },
    cartGiftcards: {
      type: [CartGiftCardSchema], // Tableau de sous-schémas
      default: [],
    },
    wishlistProducts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    cashback: {
      type: [CashbackSchema],
      default: [],
    },
    phone: {
      type: String,
      match: /^0[1-9][0-9]{8}$/, // Numéro de téléphone français au format simple
      default: "",
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
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
// Créer le modèle Mongoose
const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
