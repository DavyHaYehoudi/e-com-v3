import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useOrdersCustomer from "@/hooks/dashboard/customer/useOrdersCustomer";
import { OrderCustomerDBType } from "@/types/order/OrderTypes";
import ProductReview from "./ProductReview";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

const LeaveReviewPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { oneOrderCustomerFetch } = useOrdersCustomer(orderId);
  const [orderData, setOrderData] = useState<OrderCustomerDBType | null>(null);

  useEffect(() => {
    if (orderId) {
      oneOrderCustomerFetch().then((order) => setOrderData(order || null));
    }
  }, [orderId, oneOrderCustomerFetch]);

  if (!orderData) {
    return <div>Chargement...</div>;
  }
  // N'afficher qu'une seule fois un produit s'il y a des variants
  const filteredOrderItems = orderData.orderItems.filter(
    (item, index, self) =>
      self.findIndex((i) => i.productId === item.productId) === index
  );
  return (
    <div>
      <NavBackDashboard
        path="commandes/liste"
        text="Revenir à la liste des commandes"
        role="customer"
      />
      <div className="space-y-6 container mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-10">
          Laissez votre avis sur les produits
        </h1>

        {/* Avis sur la commande */}
        {filteredOrderItems.map((item) => (
          <ProductReview
            key={`${item.productId}-${item.variant}`}
            orderId={orderId}
            productId={item.productId}
            productName={item.name}
            productImage={item.heroImage}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaveReviewPage;
