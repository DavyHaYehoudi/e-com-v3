import { useFetch } from "@/service/hooks/useFetch";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
interface useOrderType {
  customerId?: string;
  orderId?: string;
}

const useOrder = ({ customerId, orderId }: useOrderType) => {
  const { triggerFetch: ordersFetch } = useFetch<OrderCustomerDBType[]>(
    `/admin/orders/customer/${customerId}`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: allOrdersFetch } = useFetch<OrderCustomerDBType[]>(
    `/admin/orders`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: udpateOrder } = useFetch<OrderCustomerDBType[]>(
    `/admin/orders/${orderId}`,
    { method: "PATCH", requiredCredentials: true }
  );
  const { triggerFetch: deleteOrder } = useFetch<OrderCustomerDBType[]>(
    `/admin/orders/${orderId}`,
    { method: "DELETE", requiredCredentials: true }
  );

  return {
    ordersFetch,
    allOrdersFetch,
    udpateOrder,
    deleteOrder,
  };
};

export default useOrder;
