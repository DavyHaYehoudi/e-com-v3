import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import {
  CashbackInCustomerDB,
  LabelKeyCashbackType,
} from "@/types/CustomerTypes";
import { rewards } from "@/pages/customer/advantages/cashback/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCashback from "@/hooks/dashboard/admin/useCashback";
import { toast } from "sonner";
import { formatPrice } from "@/utils/pricesFormat";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

// Utilitaire pour récupérer un motif et ses styles à partir des données centralisées
const getRewardByReason = (label: LabelKeyCashbackType) => {
  switch (label) {
    case "order":
      return rewards.find((reward) => reward.title === "Commande");
    case "loyalty":
      return rewards.find((reward) => reward.title === "Fidélité");
    case "birthday":
      return rewards.find((reward) => reward.title === "Anniversaire");
    case "review":
      return rewards.find((reward) => reward.title === "Avis produit");
    case "referral":
      return rewards.find((reward) => reward.title === "Parrainage");
    case "correction":
      return rewards.find((reward) => reward.title === "Correction");
    case "other":
      return rewards.find((reward) => reward.title === "Autre");
    default:
      return { title: "Autre", color: "bg-gray-500 text-white" };
  }
};

const CashbackHistory = () => {
  const [history, setHistory] = useState<CashbackInCustomerDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { customerId } = useParams();
  const { cashbackFetch } = useCashback(customerId);
  // Charger les données de l'historique du cashback
  useEffect(() => {
    const fetchCashbackHistory = async () => {
      setIsLoading(true);
      try {
        const data = await cashbackFetch();
        if (data) setHistory(data);
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
  }, [cashbackFetch]);
  const totalCashbackEarned =
    history &&
    history.length > 0 &&
    history.reduce((acc, b) => acc + b.cashbackEarned, 0);
  const totalCashbackSpent =
    history &&
    history.length > 0 &&
    history.reduce((acc, b) => acc + b.cashbackSpent, 0);
  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <Table>
      <TableCaption>Historique du cashback du client.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Colonne "Motif" */}
          <TableHead>Motif</TableHead>
          {/* Colonne "Capitalisé" */}
          <TableHead className="text-center">Capitalisé</TableHead>

          {/* Colonne "Dépensé" */}
          <TableHead className="text-center">Dépensé</TableHead>

          {/* Colonne "Date" */}
          <TableHead className="px-0 text-center">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.length > 0 &&
          history.map((item) => {
            const reward = getRewardByReason(item.label);

            return (
              <TableRow key={item._id}>
                {/* Colonne "Motif" */}
                <TableCell className="font-medium">
                  <Badge
                    className={`inline-block py-1 rounded-lg text-sm ${reward?.color}`}
                  >
                    <span>{reward?.title}</span>
                  </Badge>
                  {item.orderNumber && (
                    <span className="flex items-center gap-2 mt-1 whitespace-nowrap">
                      № de commande : {item.orderNumber}
                    </span>
                  )}
                </TableCell>

                {/* Colonne "Capitalisé" */}
                <TableCell
                  className={`text-center truncate ${
                    item.cashbackEarned > 0 ? "text-green-500 font-bold" : ""
                  }`}
                >
                  {formatPrice(item.cashbackEarned)}
                </TableCell>

                {/* Colonne "Dépensé" */}
                <TableCell
                  className={`text-center truncate ${
                    item.cashbackSpent > 0 ? "text-red-500 font-bold" : ""
                  }`}
                >
                  {formatPrice(item.cashbackSpent)}
                </TableCell>

                {/* Colonne "Date" */}
                <TableCell className="whitespace-nowrap text-center ">
                  {formatDate(item.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="py-2 text-right">
            Total capitalisé :
          </TableCell>
          <TableCell className="py-2 text-center text-green-500 ">
            {typeof totalCashbackEarned === "number"
              ? formatPrice(totalCashbackEarned)
              : "N.C."}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="py-2 text-right">
            Total dépensé :
          </TableCell>
          <TableCell className="py-2 text-center text-red-500 ">
            {typeof totalCashbackSpent === "number"
              ? formatPrice(totalCashbackSpent)
              : "N.C."}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="py-2 text-right">
            Total restant :
          </TableCell>
          <TableCell className="py-2 text-center text-green-500 font-bold">
            {typeof totalCashbackEarned === "number" &&
            typeof totalCashbackSpent === "number"
              ? formatPrice(totalCashbackEarned - totalCashbackSpent)
              : "N.C."}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CashbackHistory;
