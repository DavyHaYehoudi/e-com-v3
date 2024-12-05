"use client";
import { Address } from "@/app/(public)/types/AddressTypes";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";

// Hook pour récupérer l'adresse de facturation (billing address)
const useBillingAddress = () => {
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const { data: billingData, triggerFetch: fetchBilling } = useFetch<Address>(
    "/customer/address?type=billing",
    { requiredCredentials: true }
  );

  useEffect(() => {
    const getBillingAddress = async () => {
      await fetchBilling();
    };

    getBillingAddress();
  }, []); // Appel au montage seulement

  useEffect(() => {
    if (billingData) {
      setBillingAddress(billingData);
    }
  }, [billingData]);

  return billingAddress;
};
export default useBillingAddress;
