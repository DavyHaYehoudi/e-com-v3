import { TableCell, TableRow } from "@/components/ui/table";
import GiftcardToUse from "./GiftcardToUse";
import { calculateTotalAmountGiftCardToUse } from "@/utils/cartCalculs";
import { formatPrice } from "@/utils/pricesFormat";
import {  GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";

interface RowGiftcardToUseProps {
  giftCardsToUse: GiftcardToUseFrontType[];
  onGiftcardToUse: (
    code: string,
    action: "add" | "remove",
    balance?: number,
    _id?: string
  ) => void;
}
const RowGiftcardToUse: React.FC<RowGiftcardToUseProps> = ({
  giftCardsToUse,
  onGiftcardToUse,
}) => {
  return (
    <TableRow>
      <GiftcardToUse
        giftCardsToUse={giftCardsToUse}
        onGiftcardToUse={onGiftcardToUse}
      />
      <TableCell className="text-right bg-white bg-dark whitespace-nowrap">
        {calculateTotalAmountGiftCardToUse(giftCardsToUse) > 0 ? (
          <span className="whitespace-nowrap text-green-500">
            jusqu'à -{" "}
            {formatPrice(calculateTotalAmountGiftCardToUse(giftCardsToUse))}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowGiftcardToUse;
