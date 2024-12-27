import { useFetch } from "@/service/hooks/useFetch";
import { OrderStatusType, PaymentStatusType } from "@/types/status/StatusTypes";

const useStatus = () => {
  const { triggerFetch: statusOrderFetch } = useFetch<OrderStatusType[]>(
    "/admin/order-status",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: statusPaymentFetch } = useFetch<PaymentStatusType[]>(
    `/admin/payment-status`,
    {
      requiredCredentials: true,
    }
  );

  // Récupérer un statut de commande par son numéro
  const getOrderStatusByNumber = async (number: number | null) => {
    try {
      const orderStatuses: OrderStatusType[] = (await statusOrderFetch()) || [];
      return orderStatuses.find((status) => status.number === number) || null;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des statuts de commande :",
        error
      );
      return null;
    }
  };

  // Récupérer un statut de paiement par son numéro
  const getPaymentStatusByNumber = async (number: number | null) => {
    try {
      const paymentStatuses: PaymentStatusType[] =
        (await statusPaymentFetch()) || [];
      return paymentStatuses.find((status) => status.number === number) || null;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des statuts de paiement :",
        error
      );
      return null;
    }
  };

  return {
    statusOrderFetch,
    statusPaymentFetch,
    getOrderStatusByNumber,
    getPaymentStatusByNumber,
  };
};

export default useStatus;
