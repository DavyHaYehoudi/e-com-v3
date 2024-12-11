import { useFetch } from "@/service/hooks/useFetch";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  email_marketing_consent: boolean;
  birthday: string | null;
  orders_count: number | null;
}

interface AvatarData {
  avatar_url: string;
}

interface AddressData {
  company: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street_number: string;
  address1: string;
  address2: string;
  postal_code: string;
  city: string;
  country: string;
}
export type ReasonKey = "Order" | "Loyalty" | "Birthday" | "Review" | "Referral" | "Other";
export interface CashBackTransaction {
  transaction_id: number;
  customer_id: number;
  order_id: number | null;
  confirmation_number: string | null;
  review_id: number | null;
  cash_back_earned_for_this_transaction: number; // Montant sous forme de chaîne, peut être converti en nombre si nécessaire
  cash_back_spent_for_this_transaction: number;  // Même remarque que ci-dessus
  createdAt: string; // ISO 8601 date string
  reason: ReasonKey;
}

export interface CashBackHistoryResponse {
  cashBacks: CashBackTransaction[];
  total_earned: number; // Total des cashbacks gagnés
  total_spent: number;  // Total des cashbacks dépensés
}

const useCustomerInfo = () => {
  const { triggerFetch: profileFetch } = useFetch<ProfileData>(
    "/customer/profile",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: avatarFetch } = useFetch<AvatarData>(
    "/customer/avatar",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: shippingAddressFetch } = useFetch<AddressData>(
    "/customer/address?type=shipping",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: billingAddressFetch } = useFetch<AddressData>(
    "/customer/address?type=billing",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateShippingAddress } = useFetch(
    "/customer/address?type=shipping",
    {
      method: "PUT",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateBillingAddress } = useFetch(
    "/customer/address?type=billing",
    {
      method: "PUT",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateProfile } = useFetch("/customer/profile", {
    method: "PATCH",
    requiredCredentials: true,
  });
  const { triggerFetch: cashbackHistoryFetch } = useFetch<CashBackHistoryResponse>(
    "/customer/cash-back-history",
    {
      requiredCredentials: true,
    }
  );

  return {
    profileFetch,
    avatarFetch,
    shippingAddressFetch,
    billingAddressFetch,
    updateProfile,
    updateShippingAddress,
    updateBillingAddress,
    cashbackHistoryFetch
  };
};

export default useCustomerInfo;
