import useOrder from "@/hooks/dashboard/admin/useOrder";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OrdersList from "./OrdersList";

export interface SelectedOrder {
  orderId: string;
  label: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderCustomerDBType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrder>({
    orderId: "",
    label: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { allOrdersFetch, deleteOrder, udpateOrder } = useOrder({
    orderId: selectedOrder.orderId,
  });

  // Fonction pour récupérer tous les commandes
  const fetchOrders = async () => {
    try {
      const data = await allOrdersFetch();
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
      toast.error("Impossible de charger vos informations.");
    }
  };

  // Fonction pour supprimer une commande (appelée depuis OrdersList)
  const handleDeleteOrder = () => {
    deleteOrder().then((result) => {
      if (!result) {
        return toast.error("Impossible de supprimer la commande");
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== selectedOrder.orderId)
      ); // Mettre à jour localement
      toast.success("Commande supprimée avec succès.");
    });
  };

  // Fonction pour update une Commande
  const handleEditOrder = (updatedLabel: string) => {
    const isExistedLabel = orders.some(
      (order) => order.orderNumber === updatedLabel
    );
    if (isExistedLabel) {
      toast.error("Cette commande existe déjà.");
      return;
    }
    udpateOrder({ label: updatedLabel.trim() }).then(() => {
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder.orderId
          ? { ...order, label: updatedLabel }
          : order
      );
      setOrders(updatedOrders);
      toast.success("Commande modifiée avec succès.");
    });
  };

  // Charger les commandes au montage
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">Commandes</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <OrdersList
          data={orders}
          handleDeleteOrder={handleDeleteOrder}
          handleEditOrder={handleEditOrder}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </div>
    </div>
  );
};

export default OrdersPage;