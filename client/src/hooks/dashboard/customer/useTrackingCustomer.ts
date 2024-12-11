import { useFetch } from "@/service/hooks/useFetch";

export interface ShippingTracking {
  id: number;
  sender: string;
  tracking_number: string;
  date_sending: string; // ISO date string
  order_id: number;
  customer_id: number;
  createdAt: string; // ISO date string
}

export type TrackingsList = ShippingTracking[];
const useTrackingCustomer = (orderId?: string) => {
  const { triggerFetch: trackingCustomerFetch } = useFetch<TrackingsList>(
    `/orders/${orderId}/tracking`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: trackingCustomerUpdate } = useFetch(
    `/orders/${orderId}/tracking`,
    { method: "PUT", requiredCredentials: true }
  );
  return {
    trackingCustomerFetch,
    trackingCustomerUpdate,
  };
};

export default useTrackingCustomer;
