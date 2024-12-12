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
import { Link, useParams } from "react-router-dom";
import { OrderItem } from "@/types/order/OrderTypes";
import OrderItemRow from "./OrderItemRow";

const ContentOrderPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { orderId } = useParams();

  const { oneOrderCustomerFetch } = useOrdersCustomer(orderId);
  useEffect(() => {
    const fetchOrderItems = async () => {
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
      }
    };
    fetchOrderItems();
  }, [orderId, oneOrderCustomerFetch]);
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <div className="mb-20">
        <h1 className="text-center mb-10">Contenu de la commande</h1>
        <Link
          to="/customer/tableau-de-bord/commandes/liste"
          className="underline text-blue-300"
        >
          Retour à la liste
        </Link>
      </div>
      <Table>
        <TableCaption>Produits achetés.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Promotion</TableHead>
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
