import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import OrdersList from "./OrdersList";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderCustomerDBType } from "@/types/OrderTypes";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const OrdersListPage = () => {
  const [data, setData] = useState<OrderCustomerDBType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ordersCustomerFetch } = useOrdersCustomer();
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await ordersCustomerFetch();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        toast.error("Impossible de charger vos informations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [ordersCustomerFetch]);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center mb-10">Liste des commandes</h1>
      <div className="container-responsive">
        <OrdersList data={data} />
      </div>
    </div>
  );
};

export default OrdersListPage;
