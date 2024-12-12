import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HistoryTable from "./HistoryTable";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";
import { formatDate } from "@/utils/formatDate";

interface GiftcardHistoryProps {
  giftcard: GiftcardCustomerDBType;
}
const GiftcardHistory: React.FC<GiftcardHistoryProps> = ({ giftcard }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          Voir les détails
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[800px] w-[300px]">
      <p>Date d&apos;achat : {formatDate(giftcard.createdAt)}</p>
        <HistoryTable giftcard={giftcard} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default GiftcardHistory;
