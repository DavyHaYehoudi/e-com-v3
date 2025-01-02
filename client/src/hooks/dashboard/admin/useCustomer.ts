import { useFetch } from "@/service/hooks/useFetch";
import { CustomerDBType } from "@/types/CustomerTypes";

const useCustomerInfo = (customerId?: string) => {
  const { triggerFetch: customersInfoFetch } = useFetch<CustomerDBType[]>(
    `/admin/customers`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: customerInfoFetch } = useFetch<CustomerDBType>(
    `/admin/customers/${customerId}`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: customerUpdate } = useFetch(
    `/admin/customers/${customerId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: customerCashbackUpdate } = useFetch(
    `/admin/customers/cashback/${customerId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );

  return {
    customersInfoFetch,
    customerInfoFetch,
    customerUpdate,
    customerCashbackUpdate
  };
};

export default useCustomerInfo;
