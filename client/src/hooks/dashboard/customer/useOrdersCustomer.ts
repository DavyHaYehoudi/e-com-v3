import { useFetch } from "@/service/hooks/useFetch";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";


const useOrdersCustomer = (id?: string) => {
  const { triggerFetch: ordersCustomerFetch } = useFetch<OrderCustomerDBType[]>(
    "/orders",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: oneOrderCustomerFetch } = useFetch<OrderCustomerDBType>(
    `/orders/${id}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    ordersCustomerFetch,
    oneOrderCustomerFetch,
  };
};

export default useOrdersCustomer;
