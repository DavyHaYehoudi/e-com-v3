import { useFetch } from "@/service/hooks/useFetch";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";

const useGiftcardsCustomer = () => {
  const { triggerFetch: giftcardsFetch } = useFetch<GiftcardCustomerDBType[]>("/giftcards", {
    requiredCredentials: true,
  });

  return {
    giftcardsFetch,
  };
};

export default useGiftcardsCustomer;
