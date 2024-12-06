import { AddressType } from "../../models/types/addressType";
import {
  GiftcardInCartType,
  ProductInCartType,
} from "../../models/types/cartType";
import { CashbackType } from "../../models/types/cashbackType";
import { Types } from "mongoose";

export interface ICustomer extends Document {
  role: "admin" | "customer";
  email: string;
  firstName: string;
  lastName: string;
  shippingAddress: AddressType;
  billingAddress: AddressType;
  cartProducts: ProductInCartType[];
  cartGiftcards: GiftcardInCartType[];
  wishlistProducts: Types.ObjectId[];
  cashback: CashbackType[];
  phone: string;
  avatarUrl: string;
  emailMarketingConsent: boolean;
  ordersTotalCount: number;
  ordersTotalAmount: number;
  birthdate: Date;
  isActive: boolean;
}
