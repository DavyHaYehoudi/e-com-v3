import { useFetch } from "@/service/hooks/useFetch";
import { CustomerDBType } from "@/types/customer/CustomerTypes";

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
  const { triggerFetch: customerInfoUpdate } = useFetch(
    `/admin/customers/${customerId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );

  return {
    customersInfoFetch,
    customerInfoFetch,
    customerInfoUpdate,
  };
};

export default useCustomerInfo;
