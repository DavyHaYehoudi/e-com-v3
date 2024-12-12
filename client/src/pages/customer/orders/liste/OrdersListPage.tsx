import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import OrdersList from "./OrdersList";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";

const OrdersListPage = () => {
  const [data, setData] = useState<OrderCustomerDBType[]>([]);
  const { ordersCustomerFetch } = useOrdersCustomer();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersCustomerFetch();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchOrders();
  }, [ordersCustomerFetch]);
  return (
    <div>
      <h1 className="text-center mb-10">Liste des commandes</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <OrdersList data={data} />
      </div>
    </div>
  );
};

export default OrdersListPage;
