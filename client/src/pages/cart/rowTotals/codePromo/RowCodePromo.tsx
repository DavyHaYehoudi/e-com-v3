import { TableCell, TableRow } from "@/components/ui/table";
import CartCodePromo from "./CartCodePromo";
import { formatPrice } from "@/utils/pricesFormat";
import { calculateCodePromoDiscountOnCartTotal } from "@/utils/cartCalculs";
import { CartProductsToBuyFrontType } from "@/types/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/GiftcardTypes";

interface RowCodePromoProps {
  promocodePercentage: number;
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
}
const RowCodePromo: React.FC<RowCodePromoProps> = ({
  promocodePercentage,
  cartProducts,
  cartGiftcards,
}) => {
  return (
    <TableRow>
      <CartCodePromo
        promocodePercentage={promocodePercentage}
      />
      <TableCell className="text-right bg-white dark bg-dark whitespace-nowrap">
        {promocodePercentage ? (
          <span className="whitespace-nowrap text-green-500">
            -{" "}
            {formatPrice(
              calculateCodePromoDiscountOnCartTotal(
                cartProducts,
                cartGiftcards,
                promocodePercentage
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
