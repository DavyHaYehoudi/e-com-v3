import { useFetch } from "@/service/hooks/useFetch";

export interface OrderCustomer {
  id: number;
  customer_id: number;
  orderStatusId: number;
  paymentStatusId: number;
  orderNumber: string;
  totalPrice: number;
  shippingPrice: number;
  cashbackEarned: number;
  cashbackSpent: number;
  createdAt: string; // ISO 8601 format date string
  updated_at: string; // ISO 8601 format date string
  codePromoAmount: number;
  totalPromoProducts: number;
  total_weight: number;
  orderStatusLabel: string;
  orderStatusColor: string;
  paymentStatusLabel: string;
  paymentStatusColor: string;
}

export interface OneOrderCustomer {
  order: OrderCustomer;
  addresses: Addresses;
}
export interface Address {
  id: number;
  type: "billing" | "shipping"; // Typage strict pour les types d'adresse
  company: string | null; // Permet `null` pour les valeurs vides
  email: string;
  phone: string;
  street_number: string;
  address1: string;
  address2: string | null; // Permet `null` pour les lignes d'adresse optionnelles
  city: string;
  postal_code: string;
  country: string;
  createdAt: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  order_id: number;
  firstName: string;
  lastName: string;
}
export interface Addresses {
  billingAddress: Address;
  shippingAddress: Address;
}
// Typing for the full response (array of orders)
export type OrdersCustomerFetch = OrderCustomer[];

// Typage pour un élément individuel de la liste
export interface OrderItem {
  order_id: number;
  product_id: number;
  customer_id: number;
  article_number: number;
  price_before_discount: number;
  discount_percentage: number | null;
  exchange_number: number | null;
  exchange_at: string | null;
  refund_number: number | null;
  refund_at: string | null;
  refund_amount: number | null;
  return_number: number | null;
  return_at: string | null;
  variant: string;
}

// Typage pour la liste complète
export type OrderItemList = OrderItem[];

const useOrdersCustomer = (id?: string) => {
  const { triggerFetch: ordersCustomerFetch } = useFetch<OrdersCustomerFetch>(
    "/orders",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: oneOrderCustomerFetch } = useFetch<OneOrderCustomer>(
    `/orders/${id}`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: orderItemsCustomerFetch } = useFetch<OrderItemList>(
    `/order-items/${id}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    ordersCustomerFetch,
    oneOrderCustomerFetch,
    orderItemsCustomerFetch,
  };
};

export default useOrdersCustomer;
