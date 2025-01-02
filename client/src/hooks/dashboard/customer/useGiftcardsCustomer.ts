import { useFetch } from "@/service/hooks/useFetch";
import { GiftcardCustomerDBType } from "@/types/GiftcardTypes";

const useGiftcardsCustomer = () => {
  const { triggerFetch: giftcardsFetch } = useFetch<GiftcardCustomerDBType[]>("/giftcards", {
    requiredCredentials: true,
  });

  return {
    giftcardsFetch,
  };
};

export default useGiftcardsCustomer;
