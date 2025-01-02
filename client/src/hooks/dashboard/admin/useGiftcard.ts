import { useFetch } from "@/service/hooks/useFetch";
import { GiftcardCustomerDBType } from "@/types/GiftcardTypes";

interface useGiftcardsCustomerType {
  customerId?: string;
  giftcardId?: string;
}
const useGiftcardsCustomer = ({
  customerId,
  giftcardId,
}: useGiftcardsCustomerType) => {
  const query = customerId ? `?customerId=${customerId}` : "";
  const { triggerFetch: giftcardsFetch } = useFetch<GiftcardCustomerDBType[]>(
    `/admin/giftcards${query}`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: fetchAllGiftcards } = useFetch<
    GiftcardCustomerDBType[]
  >(`/admin/giftcards`, {
    requiredCredentials: true,
  });
  const { triggerFetch: giftcardToOffer } = useFetch(
    `/admin/giftcards${query}`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: fetchOneGiftcard } = useFetch<GiftcardCustomerDBType>(
    `/admin/giftcards/${giftcardId}`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteGiftcard } = useFetch(
    `/admin/giftcards${giftcardId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    fetchOneGiftcard,
    fetchAllGiftcards,
    giftcardsFetch,
    giftcardToOffer,
    deleteGiftcard,
  };
};

export default useGiftcardsCustomer;
