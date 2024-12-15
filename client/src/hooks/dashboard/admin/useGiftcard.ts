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
  const { triggerFetch: giftcardToOffer } = useFetch(
    `/admin/giftcards${query}`,
    {
      method:"POST",
      requiredCredentials: true,
    }
  );

  return {
    giftcardsFetch,
    giftcardToOffer
  };
};

export default useGiftcardsCustomer;
