import { useFetch } from "@/service/hooks/useFetch";
import { CashbackInCustomerDB } from "@/types/CustomerTypes";

const useCashback = (customerId?: string) => {
  const { triggerFetch: cashbackFetch } = useFetch<CashbackInCustomerDB[]>(
    `/admin/customers/cashback/${customerId}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    cashbackFetch,
  };
};

export default useCashback;
