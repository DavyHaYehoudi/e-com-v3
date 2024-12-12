import mongoose, { Schema, Document } from "mongoose";

interface OrderAddress {
  company: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetNumber: string;
  address1: string;
  address2: string | null;
  city: string;
  postalCode: number;
  country: string;
}

interface TrackingInfo {
  trackingNumber: string;
  dateSending: string;
}

interface OrderItem {
  productId: Schema.Types.ObjectId;
  name: string;
  variant: string;
  customerId: Schema.Types.ObjectId;
  articleNumber: number;
  heroImage: string;
  priceBeforePromotionOnProduct: number;
  promotionPercentage: number;
  amountPercentage: number;
  exchangeNumber: number | null;
  exchangeAt: Date | null;
  refundNumber: number | null;
  refundAt: Date | null;
  refundAmount: number | null;
  returnNumber: number | null;
  returnAt: Date | null;
  cashbackEarned: number;
}

export interface OrderDocument extends Document {
  customerId: Schema.Types.ObjectId;
  orderStatusLabel: string;
  orderStatusColor: string;
  orderStatusNumber: number;
  paymentStatusLabel: string;
  paymentStatusColor: string;
  paymentStatusNumber: number;
  orderNumber: string;
  promocodeAmount: number;
  promocodePercentage: number;
  totalPrice: number;
  totalPromotionOnProduct: number;
  orderAddressShipping: OrderAddress;
  orderAddressBilling: OrderAddress;
  cashbackEarned: number;
  cashbackSpent: number;
  trackingNumber: TrackingInfo;
  orderItems: OrderItem[];
}

const OrderAddressSchema = new Schema<OrderAddress>({
  company: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  streetNumber: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  postalCode: { type: Number, required: true },
  country: { type: String, default: "France" },
});

const TrackingInfoSchema = new Schema<TrackingInfo>({
  trackingNumber: { type: String, required: true },
  dateSending: { type: String, required: true },
});

const OrderItemSchema = new Schema<OrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  variant: { type: String, default: null },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  articleNumber: { type: Number, required: true },
  heroImage: { type: String, required: true },
  priceBeforePromotionOnProduct: { type: Number, required: true },
  promotionPercentage: { type: Number, default: 0 },
  cashbackEarned: { type: Number, default: 0 },
  exchangeNumber: { type: Number, default: null },
  exchangeAt: { type: String, default: null },
  refundNumber: { type: Number, default: null },
  refundAt: { type: String, default: null },
  refundAmount: { type: Number, default: null },
  returnNumber: { type: Number, default: null },
  returnAt: { type: String, default: null },
});

const OrderSchema = new Schema<OrderDocument>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderStatusLabel: { type: String, required: true },
    orderStatusNumber: { type: Number, required: true },
    orderStatusColor: { type: String, required: true },
    paymentStatusLabel: { type: String, required: true },
    paymentStatusNumber: { type: Number, required: true },
    paymentStatusColor: { type: String, required: true },
    orderNumber: { type: String, required: true, unique: true },
    promocodeAmount: { type: Number, default: 0 },
    promocodePercentage: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    totalPromotionOnProduct: { type: Number, default: 0 },
    orderAddressShipping: { type: OrderAddressSchema, required: true },
    orderAddressBilling: { type: OrderAddressSchema, required: true },
    cashbackEarned: { type: Number, default: 0 },
    cashbackSpent: { type: Number, default: 0 },
    trackingNumber: { type: TrackingInfoSchema, default: null },
    orderItems: { type: [OrderItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
