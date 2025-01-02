import { useEffect, useState } from "react";
import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { OrderItem } from "@/types/OrderTypes";
import OrderItemRow from "./OrderItemRow";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ContentOrderPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();

  const { oneOrderCustomerFetch } = useOrdersCustomer(orderId);
  useEffect(() => {
    const fetchOrderItems = async () => {
      setIsLoading(true);
      try {
        const data = await oneOrderCustomerFetch();
        if (data) {
          setOrderItems(data.orderItems);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des order items :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderItems();
  }, [orderId, oneOrderCustomerFetch]);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <div className="mb-20">
        <h1 className="text-center mb-10">Contenu de la commande</h1>
        <NavBackDashboard
          path="commandes/liste"
          text="Revenir à la liste des commandes"
          role="customer"
        />
      </div>
      <Table>
        <TableCaption>Produits achetés.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Promotion</TableHead>
            <TableHead>Retour</TableHead>
            <TableHead>Echange</TableHead>
            <TableHead>Remboursement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems &&
            orderItems.length > 0 &&
            orderItems.map((item, index) => (
              <OrderItemRow key={index} item={item} />
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default ContentOrderPage;
