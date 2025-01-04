import useCustomerInfo from "@/hooks/dashboard/customer/useCustomerInfo";
import CashbackBanner from "./CashbackBanner";
import CashbackHistory from "./CashbackHistory";
import CashbackSummary from "./CashbackSummary";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CashbackInCustomerDB } from "@/types/CustomerTypes";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const CashbackHistoryPage = () => {
  const [history, setHistory] = useState<CashbackInCustomerDB[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { customerInfoFetch } = useCustomerInfo();
  // Charger les données de l'historique du cashback
  useEffect(() => {
    const fetchCashbackHistory = async () => {
      setIsLoading(true);
      try {
        const data = await customerInfoFetch();
        if (data) setHistory(data.cashback);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCashbackHistory();
  }, [customerInfoFetch]);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div className="pb-10">
      <h1 className="text-center mb-10">Historique de votre cashback</h1>
      <div className="container mx-auto p-2">
        <CashbackSummary history={history} />
        <CashbackBanner />
      </div>
      <div className="container-responsive">
        <CashbackHistory history={history} />
      </div>
    </div>
  );
};

export default CashbackHistoryPage;
