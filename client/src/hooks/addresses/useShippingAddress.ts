"use client";
import { Address } from "@/app/(public)/types/AddressTypes";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";

// Hook pour récupérer l'adresse de livraison (shipping address)
const useShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const { data: shippingData, triggerFetch: fetchShipping } = useFetch<Address>(
    "/customer/address?type=shipping",
    { requiredCredentials: true }
  );

  useEffect(() => {
    const getShippingAddress = async () => {
      await fetchShipping();
    };

    getShippingAddress();
  }, []); // Appel au montage seulement

  useEffect(() => {
    if (shippingData) {
      setShippingAddress(shippingData);
    }
  }, [shippingData]);

  return shippingAddress;
};
export default useShippingAddress;
