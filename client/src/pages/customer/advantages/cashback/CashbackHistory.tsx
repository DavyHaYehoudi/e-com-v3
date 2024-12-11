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
import {
  CashBackHistoryResponse,
  ReasonKey,
} from "../../../../hooks/dashboard/customer/useCustomerInfo";
import { formatDate } from "@/utils/formatDate";
import { Minus, Plus } from "lucide-react";
import ClipboardButton from "@/components/shared/ClipboardButton";
import { rewards } from "./data";

interface CashbackHistoryProps {
  history: CashBackHistoryResponse | null;
}

// Utilitaire pour récupérer un motif et ses styles à partir des données centralisées
const getRewardByReason = (reason: ReasonKey) => {
  switch (reason) {
    case "Order":
      return rewards.find((reward) => reward.title === "Commande");
    case "Loyalty":
      return rewards.find((reward) => reward.title === "Fidélité");
    case "Birthday":
      return rewards.find((reward) => reward.title === "Anniversaire");
    case "Review":
      return rewards.find((reward) => reward.title === "Avis produit");
    case "Referral":
      return rewards.find((reward) => reward.title === "Parrainage");
    default:
      return { title: "Autre", color: "bg-gray-500 text-white" };
  }
};

const CashbackHistory: React.FC<CashbackHistoryProps> = ({ history }) => {
  return (
    <Table className="w-full">
      <TableCaption>Historique de votre cashback.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Colonne "Motif" */}
          <TableHead className="w-1/4 px-0">Motif</TableHead>

          {/* Colonne "Capitalisé" */}
          <TableHead className="w-1/4 px-0">
            <span className="hidden sm:table-cell">Capitalisé</span>
            <span className="table-cell sm:hidden text-green-500">
              <Plus className="w-5 h-5 mx-auto" />
            </span>
          </TableHead>

          {/* Colonne "Dépensé" */}
          <TableHead className="w-1/4 px-0">
            <span className="hidden sm:table-cell">Dépensé</span>
            <span className="table-cell sm:hidden text-red-500">
              <Minus className="w-5 h-5 mx-auto" />
            </span>
          </TableHead>

          {/* Colonne "Date" */}
          <TableHead className="w-1/4 px-0 text-center">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history &&
          history.cashBacks &&
          history.cashBacks.length > 0 &&
          history.cashBacks.map((item) => {
            const reward = getRewardByReason(item.reason);

            return (
              <TableRow key={item.transaction_id}>
                {/* Colonne "Motif" */}
                <TableCell className="font-medium">
                  <Badge
                    className={`inline-block py-1 rounded-lg text-sm ${reward?.color}`}
                  >
                    <span>{reward?.title}</span>
                  </Badge>
                  {item.confirmation_number && (
                    <span className="flex items-center gap-2 mt-1">
                      {item.confirmation_number}
                      <ClipboardButton text={item.confirmation_number} />
                    </span>
                  )}
                </TableCell>

                {/* Colonne "Capitalisé" */}
                <TableCell
                  className={`w-1/4 truncate ${
                    item.cash_back_earned_for_this_transaction > 0
                      ? "text-green-500 font-bold"
                      : ""
                  }`}
                >
                  {item.cash_back_earned_for_this_transaction}
                </TableCell>

                {/* Colonne "Dépensé" */}
                <TableCell
                  className={`w-1/4 truncate ${
                    item.cash_back_spent_for_this_transaction > 0
                      ? "text-red-500 font-bold"
                      : ""
                  }`}
                >
                  {item.cash_back_spent_for_this_transaction}
                </TableCell>

                {/* Colonne "Date" */}
                <TableCell className="w-1/4 text-center ">
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
