import useCustomerInfo from "@/hooks/dashboard/customer/useCustomerInfo";
import CashbackBanner from "./CashbackBanner";
import CashbackHistory from "./CashbackHistory";
import CashbackSummary from "./CashbackSummary";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CashbackInCustomerDB } from "@/types/customer/CustomerTypes";

const CashbackHistoryPage = () => {
  const [history, setHistory] = useState<CashbackInCustomerDB[] | null>(null);
  const { customerInfoFetch } = useCustomerInfo();
  // Charger les données de l'historique du cashback
  useEffect(() => {
    const fetchCashbackHistory = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) setHistory(data.cashback);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchCashbackHistory();
  }, [customerInfoFetch]);
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <h1 className="text-center mb-10">Historique de votre cashback</h1>
      <CashbackSummary history={history} />
      <CashbackBanner />
      <CashbackHistory history={history} />
    </div>
  );
};

export default CashbackHistoryPage;
