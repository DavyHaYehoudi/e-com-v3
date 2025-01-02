import React, { useEffect, useState } from "react";
import { MarketingCampaignDBType } from "@/types/MarketingTypes";
import { CustomerDBType } from "@/types/CustomerTypes";
import useMarketing from "@/hooks/dashboard/admin/useMarketing";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import MarketingCard from "./MarketingCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export interface SelectMarketing {
  marketingId: string;
  subject: string;
}
const MarketingsPage: React.FC = () => {
  const [selectedMarketing, setSelectedMarketing] = useState<SelectMarketing>({
    marketingId: "",
    subject: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [marketingsList, setMarketingsList] = useState<
    MarketingCampaignDBType[]
  >([]);
  const [customerEmails, setCustomerEmails] = useState<string[]>([]);

  const { getAllMarketings } = useMarketing();
  const { customersInfoFetch } = useCustomerInfo();

  useEffect(() => {
    // Récupérer les campagnes marketing
    const fetchMarketings = async () => {
      setIsLoading(true);
      const response = await getAllMarketings();
      if (response) {
        setMarketingsList(response);
        setIsLoading(false);
      }
    };

    // Récupérer les emails des clients ayant accepté le consentement
    const fetchCustomers = async () => {
      const response = await customersInfoFetch();
      if (response) {
        const emails = response
          .filter((customer: CustomerDBType) => customer.emailMarketingConsent)
          .map((customer: CustomerDBType) => customer.email);
        setCustomerEmails(emails);
      }
    };

    fetchMarketings();
    fetchCustomers();
  }, [getAllMarketings, customersInfoFetch]);
  const handleDeleteMarketing = (marketingId: string) => {
    setMarketingsList((prevMarketingsList) =>
      prevMarketingsList.filter((r) => r._id !== marketingId)
    );
  };
  const handleSentMarketing = (result: MarketingCampaignDBType) => {
    const marketingsListTemp = marketingsList.map((mark) => {
      if (mark._id === result._id) {
        return result;
      }
      return mark;
    });
    setMarketingsList(marketingsListTemp);
  };
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center mb-10">Liste des evenements</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
        {marketingsList.map((marketing) => (
          <MarketingCard
            key={marketing._id}
            marketing={marketing}
            customerEmails={customerEmails}
            handleDeleteMarketing={handleDeleteMarketing}
            selectedMarketing={selectedMarketing}
            setSelectedMarketing={setSelectedMarketing}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
            handleSentMarketing={handleSentMarketing}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketingsPage;
