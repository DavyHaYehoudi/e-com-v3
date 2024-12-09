import { ProductDBType, VariantProductType } from "../product/ProductTypes";

export interface CustomerDBType {
  shippingAddress: Address;
  billingAddress: Address;
  _id: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  wishlistProducts: ProductDBType[];
  phone: string;
  avatarUrl: string;
  emailMarketingConsent: boolean;
  ordersTotalCount: number;
  ordersTotalAmount: number;
  birthdate: string | null;
  isActive: boolean;
  cartProducts: CartProductsInCustomerDB[];
  cartGiftcards: CartGiftcardsInCustomerDB[];
  cashback: CashbackInCustomerDB[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartProductsInCustomerDB extends ProductDBType {
  quantity: number; // Quantité dans le panier
  variant: VariantProductType;
  cartItemId: string; // Identifiant de l'élément du panier
}

export interface CartGiftcardsInCustomerDB {
  amount: number;
  quantity: number;
  _id: string;
  idTemp: number;
}

export interface CashbackInCustomerDB {
  cashbackEarned: number;
  cashbackSpent: number;
  label: string;
  orderNumber: string | null;
  reviewId: string | null;
  _id: string;
}

export interface Address {
  company?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
