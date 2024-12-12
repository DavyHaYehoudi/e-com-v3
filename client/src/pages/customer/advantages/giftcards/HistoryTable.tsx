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
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/pricesFormat";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";

interface HistoryTableProps {
  giftcard: GiftcardCustomerDBType;
}
const HistoryTable: React.FC<HistoryTableProps> = ({ giftcard }) => {
  return (
    <Table>
      <TableCaption>
        Détails d&apos;utilisation de la carte cadeau.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Date d&apos;usage</TableHead>
          <TableHead>Montant utilisé</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcard &&
          giftcard.usageHistory &&
          giftcard.usageHistory.length > 0 &&
          giftcard.usageHistory.map((item,index) => (
            <>
              <TableRow key={index}>
                <TableCell>{item.usedByCustomerId}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatPrice(item.amountUsed)}</TableCell>
              </TableRow>
            </>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default HistoryTable;
