import useGiftcardsCustomer from "@/hooks/dashboard/admin/useGiftcard";
import { UsageHistoryEntry } from "@/types/GiftcardTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GiftcardHistoryDetail from "./GiftcardHistoryDetail";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const GiftcardHistoryPage = () => {
  const [giftcardHistory, setGiftcardHistory] = useState<UsageHistoryEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const { giftcardId } = useParams();
  const { fetchOneGiftcard } = useGiftcardsCustomer({ giftcardId });
  useEffect(() => {
    setIsLoading(true);
    if (giftcardId) {
      const fetchGiftcard = async () => {
        try {
          const data = await fetchOneGiftcard(giftcardId);
          if (data) {
            setGiftcardHistory(data.usageHistory);
          }
        } catch (error) {
          console.log("error:", error);
          toast.error("Une erreur dans la récupération de la carte cadeau");
        } finally {
          setIsLoading(false);
        }
      };
      fetchGiftcard();
    }
  }, []);
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
      <NavBackDashboard
        path="avantages/cartes-cadeaux/liste"
        text="Revenir à la liste des cartes cadeaux"
        role="admin"
      />
      <div>
        <h1 className="text-center mb-10">Historique de la carte cadeau</h1>
        <div className="container-responsive">
          <GiftcardHistoryDetail giftcardHistory={giftcardHistory} />
        </div>
      </div>
    </div>
  );
};

export default GiftcardHistoryPage;
