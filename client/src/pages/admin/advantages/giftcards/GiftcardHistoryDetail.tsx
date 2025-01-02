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
import { UsageHistoryEntry } from "@/types/GiftcardTypes";

import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/pricesFormat";

interface GiftcardHistoryDetailProps {
  giftcardHistory: UsageHistoryEntry[];
}
const GiftcardHistoryDetail: React.FC<GiftcardHistoryDetailProps> = ({
  giftcardHistory,
}) => {
  return (
    <Table>
      <TableCaption>Historique de la carte cadeau.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Montant utilisé</TableHead>
          <TableHead>Date d'utilisation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcardHistory.map((item) => (
          <TableRow key={item.createdAt}>
            <TableCell>{formatPrice(item.amountUsed)}</TableCell>
            <TableCell>{formatDate(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default GiftcardHistoryDetail;
