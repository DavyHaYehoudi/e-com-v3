import { TableCell, TableRow } from "@/components/ui/table";
import CartCodePromo from "./CartCodePromo";
import { formatPrice } from "@/utils/pricesFormat";
import { calculateCodePromoDiscountOnCartTotal } from "@/utils/cartCalculs";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/giftcard/GiftcardTypes";

interface RowCodePromoProps {
  onPromotion: (discount_percentage: number) => void;
  codePromoPercentage: number;
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
}
const RowCodePromo: React.FC<RowCodePromoProps> = ({
  onPromotion,
  codePromoPercentage,
  cartProducts,
  cartGiftcards,
}) => {
  return (
    <TableRow>
      <CartCodePromo
        onPromotion={onPromotion}
        codePromoPercentage={codePromoPercentage}
      />
      <TableCell className="text-right bg-white dark bg-dark whitespace-nowrap">
        {codePromoPercentage ? (
          <span className="whitespace-nowrap text-green-500">
            -{" "}
            {formatPrice(
              calculateCodePromoDiscountOnCartTotal(
                cartProducts,
                cartGiftcards,
                codePromoPercentage
              )
            )}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowCodePromo;
