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
import { rewards } from "./data";
import {
  CashbackInCustomerDB,
  LabelKeyCashbackType,
} from "@/types/customer/CustomerTypes";
import { formatPrice } from "@/utils/pricesFormat";
import { compareDesc } from "date-fns";

interface CashbackHistoryProps {
  history: CashbackInCustomerDB[] | null;
}

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

const CashbackHistory: React.FC<CashbackHistoryProps> = ({ history }) => {
  return (
    <Table>
      <TableCaption>Historique de votre cashback.</TableCaption>
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
        {history &&
          history.length > 0 &&
          history
            .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
            .map((item) => {
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
                  <TableCell className="whitespace-nowrap  text-center ">
                    {formatDate(item.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default CashbackHistory;
