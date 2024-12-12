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
import ClipboardButton from "@/components/shared/ClipboardButton";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/pricesFormat";
import { GiftCardsCustomer } from "../../../../hooks/dashboard/customer/useGiftcardsCustomer";

interface HistoryTableProps {
  giftcard: GiftCardsCustomer;
}
const HistoryTable: React.FC<HistoryTableProps> = ({ giftcard }) => {
  return (
    <Table>
      <TableCaption>
        Détails d&apos;utilisation de la carte cadeau.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Commande</TableHead>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Date d&apos;usage</TableHead>
          <TableHead>Montant utilisé</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcard &&
          giftcard.usage_history &&
          giftcard.usage_history.length > 0 &&
          giftcard.usage_history.map((item) => (
            <>
              <TableRow key={item.orderNumber}>
                <TableCell className="flex items-center gap-2">
                  {item.orderNumber}
                  <span className="ml-2">
                    <ClipboardButton text={item.orderNumber} />
                  </span>{" "}
                </TableCell>
                <TableCell>{item.used_by_customer_id}</TableCell>
                <TableCell>{formatDate(item.used_at)}</TableCell>
                <TableCell>{formatPrice(item.amount_used)}</TableCell>
              </TableRow>
            </>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default HistoryTable;
