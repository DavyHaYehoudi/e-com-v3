import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import GiftcardHistory from "./GiftcardHistory";
import { GiftCardsCustomer } from "../../../../hooks/dashboard/customer/useGiftcardsCustomer";
import ClipboardButton from "@/components/shared/ClipboardButton";

interface ActionsProps {
  giftcard: GiftCardsCustomer;
}
const Actions: React.FC<ActionsProps> = ({ giftcard }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col">
          <span>Copier le code</span>
          <span className="flex items-center gap-2">
            {" "}
            {giftcard.code}
            <ClipboardButton text={giftcard.code} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <GiftcardHistory giftcard={giftcard} />{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
