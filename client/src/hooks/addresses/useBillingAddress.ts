import { useFetch } from "@/service/hooks/useFetch";
import { Address, CustomerDBType } from "@/types/customer/CustomerTypes";
import { useEffect, useState } from "react";

// Hook pour récupérer l'adresse de facturation (billing address)
const useBillingAddress = () => {
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const { data: customerInfo, triggerFetch: fetchBilling } =
    useFetch<CustomerDBType>("/customer/address?type=billing", {
      requiredCredentials: true,
    });

  useEffect(() => {
    const getBillingAddress = async () => {
      await fetchBilling();
    };

    getBillingAddress();
  }, []); // Appel au montage seulement

  useEffect(() => {
    if (customerInfo) {
      setBillingAddress(customerInfo.billingAddress);
    }
  }, [customerInfo]);

  return billingAddress;
};
export default useBillingAddress;
