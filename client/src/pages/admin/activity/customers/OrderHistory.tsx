import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrder from "@/hooks/dashboard/admin/useOrder";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import { formatPrice } from "@/utils/pricesFormat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const OrderHistory = () => {
  const [orders, setOrder] = useState<OrderCustomerDBType[]>([]);
  const { customerId } = useParams();
  const { ordersFetch } = useOrder(customerId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersFetch();
        if (data) {
          setOrder(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchOrders();
  }, [ordersFetch]);
  return (
    <Table>
      <TableCaption>Liste des commandes du client.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Etape</TableHead>
          <TableHead>Paiement</TableHead>
          <TableHead>№ de commande</TableHead>
          <TableHead>Cashback capitalisé</TableHead>
          <TableHead>Cashback dépensé</TableHead>
          <TableHead>№ de suivi</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 &&
          orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                {" "}
                <Badge
                  style={{ backgroundColor: order.orderStatusColor }}
                  className="text-white text-center"
                >
                  {order.orderStatusLabel}
                </Badge>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <Badge
                  style={{ backgroundColor: order.paymentStatusColor }}
                  className="text-white text-center"
                >
                  {order.paymentStatusLabel}
                </Badge>{" "}
              </TableCell>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{formatPrice(order.cashbackEarned)}</TableCell>
              <TableCell>{formatPrice(order.cashbackSpent)}</TableCell>
              <TableCell>{order.trackingNumber?.trackingNumber||"En cours..."}</TableCell>
              <TableCell>{formatPrice(order.totalPrice)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Nombre total d'articles </TableCell>
          <TableCell>
            {orders.length > 0 &&
              orders.reduce(
                (acc, row) =>
                  acc +
                  row.orderItems.reduce(
                    (acc2, item) => acc2 + item.articleNumber,
                    0
                  ),
                0
              )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default OrderHistory;
