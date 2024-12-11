import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HistoryTable from "./HistoryTable";
import CommonDetails from "./CommonDetails";
import { GiftCardsCustomer } from "../../../../hooks/dashboard/customer/useGiftcardsCustomer";

interface GiftcardHistoryProps {
  giftcard: GiftCardsCustomer;
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
        <CommonDetails giftcard={giftcard} />
        <HistoryTable giftcard={giftcard} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default GiftcardHistory;
