import { TableCell, TableRow } from "@/components/ui/table";
import GiftcardToUse from "./GiftcardToUse";
import { calculateTotalAmountGiftCardToUse } from "@/utils/cartCalculs";
import { formatPrice } from "@/utils/pricesFormat";
import { GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";

interface RowGiftcardToUseProps {
  giftcardsToUse: GiftcardToUseFrontType[];
}
const RowGiftcardToUse: React.FC<RowGiftcardToUseProps> = ({
  giftcardsToUse,
}) => {
  return (
    <TableRow>
      <GiftcardToUse giftcardsToUse={giftcardsToUse} />
      <TableCell className="text-right bg-white bg-dark whitespace-nowrap">
        {calculateTotalAmountGiftCardToUse(giftcardsToUse) > 0 ? (
          <span className="whitespace-nowrap text-green-500">
            {formatPrice(calculateTotalAmountGiftCardToUse(giftcardsToUse))}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowGiftcardToUse;
