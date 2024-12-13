import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { CreatedOrderDBType } from "@/types/payment/PaymentTypes";
import { useSelector } from "react-redux";

const useCreatePendingOrder = () => {
  const giftcardsToUse = useSelector(
    (state: RootState) => state.priceAdjustments.giftcards
  );
  const promocode = useSelector(
    (state: RootState) => state.priceAdjustments.promocode
  );
  const cashbackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const orderAddressShipping = useSelector(
    (state: RootState) => state.addresses.shipping
  );
  const orderAddressBilling = useSelector(
    (state: RootState) => state.addresses.billing
  );
  const formatData = {
    giftcardsToUse,
    cashbackToSpend,
    promocode: promocode.code,
    orderAddressBilling,
    orderAddressShipping,
  };

  const { triggerFetch } = useFetch<CreatedOrderDBType>("/payment/confirm", {
    method: "POST",
    requiredCredentials: true,
  });
  const getOrderInformation = async () => {
    try {
      const data = await triggerFetch(formatData);
      if (data) {
        return { order: data.orderCreated, firstName: data.firstName };
      }
    } catch (error) {
      console.log("error dans useCreatePendingOrder :", error);
    }
  };
  return { getOrderInformation };
};

export default useCreatePendingOrder;
