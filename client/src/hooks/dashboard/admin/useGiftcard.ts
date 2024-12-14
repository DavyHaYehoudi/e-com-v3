import { useFetch } from "@/service/hooks/useFetch";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";

const useGiftcardsCustomer = (customerId?: string) => {
  const query = customerId ? `?customerId=${customerId}` : "";
  const { triggerFetch: giftcardsFetch } = useFetch<GiftcardCustomerDBType[]>(
    `/admin/giftcards${query}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    giftcardsFetch,
  };
};

export default useGiftcardsCustomer;
