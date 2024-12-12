import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TrackingNumberApi from "./TrackingNumberApi";
import OrderAddresses from "./OrderAddresses";

const TrackingNumberPage = () => {
  const [orderData, setOrderData] = useState<OrderCustomerDBType | null>(null);
  const { orderId } = useParams();

  const { oneOrderCustomerFetch } = useOrdersCustomer(orderId);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await oneOrderCustomerFetch(orderId);
        if (data) {
          setOrderData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
      }
    };
    fetchOrder();
  }, [orderId, oneOrderCustomerFetch]);

  return (
    <div>
      <Link
        to="/customer/tableau-de-bord/commandes/liste"
        className="underline text-blue-300"
      >
        Retour à la liste
      </Link>
      <div>
        {orderData && (
          <OrderAddresses
            shippingAddresses={orderData?.orderAddressShipping}
            billingAddresses={orderData?.orderAddressBilling}
          />
        )}
        <TrackingNumberApi
          trackingNumber={orderData?.trackingNumber?.trackingNumber}
        />
      </div>
    </div>
  );
};

export default TrackingNumberPage;
