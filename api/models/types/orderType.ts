import mongoose from "mongoose";
import { AddressType } from "./addressType";
import { OrderItemType } from "./orderItemType";
export interface orderDataCreateType {
  customerId: mongoose.Types.ObjectId | string;
  orderStatusLabel: string;
  orderStatusNumber: number;
  paymentStatusLabel: string;
  paymentStatusNumber: number;
  orderNumber: string;
  promocodeAmount: number;
  promocodePercentage: number;
  totalPrice: number;
  totalPromotionOnProduct: number;
  orderAddressShipping: AddressType;
  orderAddressBilling: AddressType;
  cashbackEarned: number;
  cashbackSpent: number;
  orderItems: OrderItemType[];
}
