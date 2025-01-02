import { useFetch } from "@/service/hooks/useFetch";
import { CustomerDBType } from "@/types/CustomerTypes";

const useCustomerInfo = () => {
  const { triggerFetch: customerInfoFetch } = useFetch<CustomerDBType>(
    "/customer",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: customerInfoUpdate } = useFetch("/customer", {
    method: "PATCH",
    requiredCredentials: true,
  });

  return {
    customerInfoFetch,
    customerInfoUpdate,
  };
};

export default useCustomerInfo;
