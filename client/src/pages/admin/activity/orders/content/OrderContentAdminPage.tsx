import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrder from "@/hooks/dashboard/admin/useOrder";
import { OrderCustomerDBType, OrderItem } from "@/types/order/OrderTypes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import OrderPaymentStatus from "./OrderPaymentStatus";
import { OrderStatusType, PaymentStatusType } from "@/types/status/StatusTypes";
import useStatus from "@/hooks/dashboard/admin/useStatus";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const OrderContentAdminPage = () => {
  const [order, setOrder] = useState<OrderCustomerDBType | null>();
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [statusOrderNumber, setStatusOrderNumber] = useState<number | null>(
    null
  );
  const [statusPaymentNumber, setStatusPayment] = useState<number | null>(null);
  const [orderStatusSelected, setOrderStatusSelected] =
    useState<OrderStatusType | null>(null);
  const [paymentStatusSelected, setPaymentStatusSelected] =
    useState<PaymentStatusType | null>(null);
  const [isOrderStatusLoading, setIsOrderStatusLoading] = useState(false);
  const [isPaymentStatusloading, setIsPaymentStatusloading] = useState(false);
  const { getOrderStatusByNumber, getPaymentStatusByNumber } = useStatus();
  const { orderId } = useParams();
  const { orderFetch } = useOrder({ orderId });

  useEffect(() => {
    if (orderId) {
      orderFetch().then((order) => {
        setOrder(order || null);
        setStatusOrderNumber(order?.orderStatusNumber || 0);
        setStatusPayment(order?.paymentStatusNumber || 0);
      });
    }
  }, [orderId, orderFetch]);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!orderStatusSelected) {
          const orderStatusDetails = await getOrderStatusByNumber(
            statusOrderNumber
          );
          setOrderStatusSelected(orderStatusDetails || null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statuts des commandes :",
          error
        );
      }
    };

    fetchStatus();
  }, [orderStatusSelected, getOrderStatusByNumber]);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!paymentStatusSelected) {
          const paymentStatusDetails = await getPaymentStatusByNumber(
            statusPaymentNumber
          );
          setPaymentStatusSelected(paymentStatusDetails || null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des statuts :", error);
      }
    };

    fetchStatus();
  }, [paymentStatusSelected, getPaymentStatusByNumber]);

  if (!order) return <div>Chargement...</div>;

  const handleOrderStatusChange = async (status: string) => {
    setIsOrderStatusLoading(true);
    setStatusOrderNumber(parseInt(status));

    const orderStatusDetails = await getOrderStatusByNumber(parseInt(status));
    setOrderStatusSelected(orderStatusDetails);
    setIsOrderStatusLoading(false);
  };

  const handlePaymentStatusChange = async (status: string) => {
    setIsPaymentStatusloading(true);
    setStatusPayment(parseInt(status));
    const paymentStatusDetails = await getPaymentStatusByNumber(
      parseInt(status)
    );
    setPaymentStatusSelected(paymentStatusDetails);
    setIsPaymentStatusloading(false);
  };

  const handleTrackingNumberUpdate = () => {
    if (orderId && trackingNumber) {
      udpateOrder(orderId, { trackingNumber });
    }
  };

  const handleOrderItemAction = (
    item: OrderItem,
    action: "return" | "refund" | "exchange",
    value: number,
    refundAmount?: number
  ) => {
    if (orderId) {
      udpateOrder(orderId, item._id, { action, value, refundAmount });
    }
  };

  return (
    <div className="p-20">
      <NavBackDashboard
        path="activite/commandes/liste"
        text="Revenir à la liste des commandes"
        role="admin"
      />
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <h1 className="text-center mb-10">Commande № {order.orderNumber}</h1>
        {/* Informations sur la commande */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Details de la commande</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Client :</strong> {order.customerId.firstName}{" "}
                  {order.customerId.lastName}
                </p>
                <p>
                  <strong>Statut de la commande :</strong>{" "}
                  {isOrderStatusLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <Badge
                      style={{ backgroundColor: orderStatusSelected?.color }}
                      className="text-white text-center"
                    >
                      {orderStatusSelected?.label}
                    </Badge>
                  )}
                </p>
                <p>
                  <strong>Statut du paiement :</strong>{" "}
                  {isPaymentStatusloading ? (
                    <LoadingSpinner />
                  ) : (
                    <Badge
                      style={{ backgroundColor: paymentStatusSelected?.color }}
                      className="text-white text-center"
                    >
                      {paymentStatusSelected?.label}
                    </Badge>
                  )}
                </p>
              </div>
              <div>
                <p>
                  <strong>Total :</strong> {order.totalPrice} €
                </p>
              </div>
            </div>
          </CardContent>
          {/* Addresses Section */}
          <div className="grid grid-cols-2 gap-4 p-4">
            <Card className="bg-blue-50 dark:bg-blue-900">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">
                  Adresse de livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    {order.orderAddressShipping.firstName}{" "}
                    {order.orderAddressShipping.lastName}
                  </p>
                  <p>{order.orderAddressShipping.address1}</p>
                  {order.orderAddressShipping.address2 && (
                    <p>{order.orderAddressShipping.address2}</p>
                  )}
                  <p>
                    {order.orderAddressShipping.postalCode}{" "}
                    {order.orderAddressShipping.city}
                  </p>
                  <p>{order.orderAddressShipping.country}</p>
                  <p>Tél : {order.orderAddressShipping.phone}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-300">
                  Adresse de facturation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    {order.orderAddressBilling.firstName}{" "}
                    {order.orderAddressBilling.lastName}
                  </p>
                  <p>{order.orderAddressBilling.address1}</p>
                  {order.orderAddressBilling.address2 && (
                    <p>{order.orderAddressBilling.address2}</p>
                  )}
                  <p>
                    {order.orderAddressBilling.postalCode}{" "}
                    {order.orderAddressBilling.city}
                  </p>
                  <p>{order.orderAddressBilling.country}</p>
                  <p>Tél : {order.orderAddressBilling.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <CardFooter>
            <OrderPaymentStatus
              statusOrderNumber={statusOrderNumber}
              statusPaymentNumber={statusPaymentNumber}
              handleOrderStatusChange={handleOrderStatusChange}
              handlePaymentStatusChange={handlePaymentStatusChange}
            />
          </CardFooter>
        </Card>

        {/* Produits commandés */}
        <Card className="my-20">
          <CardHeader>
            <h3 className="text-lg font-semibold">Produits commandes</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="p-4 border rounded-lg">
                  <p>
                    <img src={item.heroImage} alt={item.name} />
                  </p>
                  <p>
                    <strong>Produit :</strong> {item.name}
                  </p>
                  <p>
                    <strong>Prix :</strong> {item.priceBeforePromotionOnProduct}{" "}
                    €
                  </p>
                  <Badge>{item.variant}</Badge>
                  <div className="flex justify-end space-x-4 mt-2">
                    <Button
                      onClick={() => handleOrderItemAction(item, "return", 1)}
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={() =>
                        handleOrderItemAction(
                          item,
                          "refund",
                          1,
                          item.priceBeforePromotionOnProduct
                        )
                      }
                    >
                      Remboursement
                    </Button>
                    <Button
                      onClick={() => handleOrderItemAction(item, "exchange", 1)}
                    >
                      Échange
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Numéro de suivi */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Numero de suivi</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Numéro de suivi"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Button onClick={handleTrackingNumberUpdate}>
                Mettre à jour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderContentAdminPage;
