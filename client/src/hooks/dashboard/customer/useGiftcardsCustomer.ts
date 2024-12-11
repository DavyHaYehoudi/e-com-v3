import { useFetch } from "@/service/hooks/useFetch";
export interface GiftCardUsage {
  gift_card_id: number;
  used_by_customer_id: number;
  amount_used: number;
  used_at: string; // Date sous format ISO
  confirmation_number: string;
}

export interface GiftCardsCustomer {
  first_holder_id: number;
  code: string;
  initial_value: number;
  balance: number;
  is_issued_by_admin: boolean; // 0 ou 1, peut être traduit en boolean
  expiration_date: string; // Date sous format ISO
  orderId: number;
  confirmation_number: string;
  usage_history: GiftCardUsage[];
  createdAt: string; // Date sous format ISO
  updatedAt: string; // Date sous format ISO
}
const useGiftcardsCustomer = () => {
  const { triggerFetch: giftcardsFetch } = useFetch<GiftCardsCustomer[]>("/gift-cards", {
    requiredCredentials: true,
  });

  return {
    giftcardsFetch,
  };
};

export default useGiftcardsCustomer;
