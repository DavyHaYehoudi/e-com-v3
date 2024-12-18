import useGiftcardsCustomer from "@/hooks/dashboard/admin/useGiftcard";
import { UsageHistoryEntry } from "@/types/giftcard/GiftcardTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GiftcardHistoryDetail from "./GiftcardHistoryDetail";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

const GiftcardHistoryPage = () => {
  const [giftcardHistory, setGiftcardHistory] = useState<UsageHistoryEntry[]>(
    []
  );
  const { giftcardId } = useParams();
  const { fetchOneGiftcard } = useGiftcardsCustomer({ giftcardId });
  useEffect(() => {
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
        }
      };
      fetchGiftcard();
    }
  }, []);
  return (
    <div>
      <NavBackDashboard
        path="avantages/cartes-cadeaux/liste"
        text="Revenir à la liste des cartes cadeaux"
        role="admin"
      />
      <div>
        <h1 className="text-center mb-10">Historique de la carte cadeau</h1>
        <div className="sm:w-1/2 mx-auto">
          <GiftcardHistoryDetail giftcardHistory={giftcardHistory} />
        </div>
      </div>
    </div>
  );
};

export default GiftcardHistoryPage;
