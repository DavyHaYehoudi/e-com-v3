import { useFetch } from "@/service/hooks/useFetch";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";

const useOrder = (customerId?: string) => {
  const { triggerFetch: ordersFetch } = useFetch<OrderCustomerDBType[]>(
    `/admin/orders/customer/${customerId}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    ordersFetch,
  };
};

export default useOrder;
