import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackingNumberApi from "./TrackingNumberApi";
import OrderAddresses from "./OrderAddresses";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

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
      <NavBackDashboard
        path="commandes/liste"
        text="Revenir à la liste des commandes"
        role="customer"
      />
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
