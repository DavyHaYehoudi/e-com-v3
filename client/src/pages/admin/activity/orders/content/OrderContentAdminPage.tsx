import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrder from "@/hooks/dashboard/admin/useOrder";
import { OrderCustomerDBType, TrackingInfo } from "@/types/OrderTypes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import { OrderStatusType, PaymentStatusType } from "@/types/StatusTypes";
import useStatus from "@/hooks/dashboard/admin/useStatus";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";
import OrderContentManagment, {
  ContentManagmentType,
} from "./OrderContentManagment";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/pricesFormat";
import TrackingNumber from "./TrackingNumber";
import OrderContentStatus from "./OrderContentStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReturnBadge from "@/components/shared/badge/ReturnBadge";
import ExchangeBadge from "@/components/shared/badge/ExchangeBadge";
import RefundBadge from "@/components/shared/badge/RefundBadge";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";

const OrderContentAdminPage = () => {
  const [order, setOrder] = useState<OrderCustomerDBType | null>();
  const [trackingNumberInfo, setTrackingNumberInfo] =
    useState<TrackingInfo | null>(null);
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
  const { orderFetch, udpateOrder } = useOrder({ orderId });

  useEffect(() => {
    if (orderId) {
      orderFetch().then((order) => {
        if (order) {
          setOrder(order || null);
          setStatusOrderNumber(order?.orderStatusNumber || 0);
          setStatusPayment(order?.paymentStatusNumber || 0);
          setTrackingNumberInfo(order?.trackingNumber || null);
        }
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
  }, [orderStatusSelected, getOrderStatusByNumber, statusOrderNumber]);
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
  }, [paymentStatusSelected, getPaymentStatusByNumber, statusPaymentNumber]);

  if (!order)
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );

  const handleOrderStatusChange = async (status: string) => {
    setIsOrderStatusLoading(true);
    setStatusOrderNumber(parseInt(status));

    const orderStatusDetails = await getOrderStatusByNumber(parseInt(status));
    udpateOrder({ statusOrder: parseInt(status) }).then((result) => {
      if (result) {
        toast.success("Le statut de la commande a été modifié avec succès!");
        setOrderStatusSelected(orderStatusDetails);
        setIsOrderStatusLoading(false);
      } else {
        toast.error(
          "Une erreur s'est produite lors de la modification du statut de la commande."
        );
      }
    });
  };

  const handlePaymentStatusChange = async (status: string) => {
    setIsPaymentStatusloading(true);
    setStatusPayment(parseInt(status));
    const paymentStatusDetails = await getPaymentStatusByNumber(
      parseInt(status)
    );
    udpateOrder({ statusPayment: parseInt(status) }).then((result) => {
      if (result) {
        toast.success("Le statut de paiement a été modifié avec succès!");
        setPaymentStatusSelected(paymentStatusDetails);
        setIsPaymentStatusloading(false);
      } else {
        toast.error(
          "Une erreur s'est produite lors de la modification du statut de paiement."
        );
      }
    });
  };

  const handleTrackingNumber = (data: TrackingInfo) => {
    setTrackingNumberInfo(data);
  };
  const handleManagment = (
    values: ContentManagmentType,
    orderItemId: string
  ) => {
    setOrder({
      ...order,
      orderItems: order.orderItems.map((orderItem) => {
        if (orderItem._id === orderItemId) {
          return { ...orderItem, ...values };
        }
        return orderItem;
      }),
    });
  };

  return (
    <div className="px-4 pb-80">
      <NavBackDashboard
        path="activite/commandes/liste"
        text="Revenir à la liste des commandes"
        role="admin"
      />
      <div className="container-responsive">
        <h1 className="text-center mb-10">Commande № {order.orderNumber}</h1>
        {/* Informations sur la commande */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Details de la commande</h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-2 flex-wrap">
              <div>
                <p className="flex items-center gap-2">
                  <strong>Client :</strong> {order.customerIdentity.firstName}{" "}
                  {order.customerIdentity.lastName}{" "}
                  <Avatar>
                    <AvatarImage
                      src={order.customerIdentity.avatarUrl}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {order.customerIdentity.firstName.charAt(0)}
                      {order.customerIdentity.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </p>
                <p>{order.customerIdentity.email} </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
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
            <OrderContentStatus
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
              {order.orderItems.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="p-4 border rounded-lg relative"
                >
                  <ProductImageItem
                    productId={orderItem.productId}
                    path={orderItem.heroImage}
                    name={orderItem.name}
                    width="100px"
                    height="100px"
                  />
                  <p>
                    <strong>Produit :</strong> {orderItem.name}
                  </p>
                  <p>
                    <strong>Prix :</strong>{" "}
                    {orderItem.priceBeforePromotionOnProduct} €
                  </p>
                  <p>
                    <strong>Nombre d'article(s) :</strong>{" "}
                    {orderItem.articleNumber}
                  </p>
                  <VariantBadge productVariant={orderItem.variant} />

                  {orderItem.returnNumber && orderItem.returnAt && (
                    <p>
                      <ReturnBadge /> {orderItem.returnNumber} - Le{" "}
                      {formatDate(orderItem.returnAt)}
                    </p>
                  )}
                  {orderItem.exchangeNumber && orderItem.exchangeAt && (
                    <p>
                      <ExchangeBadge /> {orderItem.exchangeNumber} - Le{" "}
                      {formatDate(orderItem.exchangeAt)}
                    </p>
                  )}
                  {orderItem.refundAmount && orderItem.refundAt && (
                    <p>
                      <RefundBadge /> {formatPrice(orderItem.refundAmount)} - Le{" "}
                      {formatDate(orderItem.refundAt)}
                    </p>
                  )}
                  <div className="absolute right-2 top-2">
                    {" "}
                    <OrderContentManagment
                      orderId={order._id}
                      orderItem={orderItem}
                      handleManagment={handleManagment}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Numéro de suivi */}
        <TrackingNumber
          handleTrackingNumber={handleTrackingNumber}
          trackingNumberInfo={trackingNumberInfo}
          orderId={order._id}
        />
      </div>
    </div>
  );
};

export default OrderContentAdminPage;
