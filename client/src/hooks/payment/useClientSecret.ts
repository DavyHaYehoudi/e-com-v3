import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface ClientSecretType {
  clientSecret: string;
  amount: number;
}

const useClientSecret = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftcards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promocode
  );
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const emailCustomer = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const bodyData = {
    codePromo,
    giftCardIds,
    cashBackToSpend,
    emailCustomer,
  };
  const { data, triggerFetch } = useFetch<ClientSecretType>("/payment/intent", {
    method: "POST",
    requiredCredentials: true,
  });

  useEffect(() => {
    if (!data) {
      triggerFetch({ bodyData });
    } else {
      setClientSecret(data.clientSecret);
      setAmount(data.amount);
    }
  }, [data, triggerFetch]);
  return { clientSecret, amount };
};
export default useClientSecret;
