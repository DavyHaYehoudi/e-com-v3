import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/pricesFormat";
import { calculateTotalCartAfterCashback } from "@/utils/cartCalculs";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";
import {
  CartGiftcardsToBuyFrontType,
  GiftcardToUseFrontType,
} from "@/types/giftcard/GiftcardTypes";

interface RowTotalCartProps {
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
  giftcardsToUse: GiftcardToUseFrontType[];
  codePromoPercentage: number;
  selectedCashback: number | null;
}
const RowTotalCart: React.FC<RowTotalCartProps> = ({
  cartProducts,
  cartGiftcards,
  giftcardsToUse,
  codePromoPercentage,
  selectedCashback,
}) => {
  return (
    <TableRow className="font-extrabold">
      <TableCell colSpan={5} className="border-b border-gray-500">
        Total du panier
      </TableCell>
      <TableCell className="text-right border-b border-gray-500 whitespace-nowrap">
        {cartProducts &&
          formatPrice(
            calculateTotalCartAfterCashback(
              cartProducts,
              cartGiftcards,
              giftcardsToUse,
              codePromoPercentage,
              selectedCashback
            )
          )}
      </TableCell>
    </TableRow>
  );
};

export default RowTotalCart;
