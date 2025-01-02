import { useFetch } from "@/service/hooks/useFetch";
import { Address, CustomerDBType } from "@/types/CustomerTypes";
import { useEffect, useState } from "react";

// Hook pour récupérer l'adresse de livraison (shipping address)
const useShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const { data: customerInfo, triggerFetch: fetchShipping } =
    useFetch<CustomerDBType>("/customer", { requiredCredentials: true });

  useEffect(() => {
    const getShippingAddress = async () => {
      await fetchShipping();
    };

    getShippingAddress();
  }, []); // Appel au montage seulement

  useEffect(() => {
    if (customerInfo) {
      setShippingAddress(customerInfo.shippingAddress);
    }
  }, [customerInfo]);

  return shippingAddress;
};
export default useShippingAddress;
