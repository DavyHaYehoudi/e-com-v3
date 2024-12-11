import { Address } from "../customer/CustomerTypes";
import { ProductDBType } from "../product/ProductTypes";

export interface OrderCreated {
    customerId: string;
    orderStatusLabel: string;
    orderStatusNumber: number;
    paymentStatusLabel: string;
    paymentStatusNumber: number;
    orderNumber: string;
    promocodeAmount: number;
    promocodePercentage: number;
    totalPrice: number;
    totalPromotionOnProduct: number;
    orderAddressShipping: Address;
    orderAddressBilling: Address;
    cashbackEarned: number;
    cashbackSpent: number;
    trackingNumber: string | null;
    orderItems: OrderItem[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface OrderItem {
    productId: ProductDBType;
    name: string;
    variant: string;
    customerId: string;
    articleNumber: number;
    heroImage: string;
    priceBeforePromotionOnProduct: number;
    promotionPercentage: number;
    cashbackEarned: number;
    exchangeNumber: number | null;
    exchangeAt: string | null;
    refundNumber: number | null;
    refundAt: string | null;
    refundAmount: number | null;
    returnNumber: number | null;
    returnAt: string | null;
    _id: string;
}