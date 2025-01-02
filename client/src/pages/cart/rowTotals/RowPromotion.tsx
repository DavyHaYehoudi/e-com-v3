import { TableCell, TableRow } from "@/components/ui/table";
import { CartProductsToBuyFrontType } from "@/types/CartTypes";
import { calculateTotalDiscountCart } from "@/utils/cartCalculs";
import { formatPrice } from "@/utils/pricesFormat";

interface RowPromotionProps {
  cartProducts: CartProductsToBuyFrontType[];
}
const RowPromotion: React.FC<RowPromotionProps> = ({ cartProducts }) => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="border-b border-gray-500">
        Total des promotions
      </TableCell>
      <TableCell className="text-right border-b border-gray-500">
        {cartProducts &&
          (calculateTotalDiscountCart(cartProducts) > 0 ? (
            <span className="whitespace-nowrap text-green-500">
              - {formatPrice(calculateTotalDiscountCart(cartProducts))}
            </span>
          ) : (
            0
          ))}
      </TableCell>
    </TableRow>
  );
};

export default RowPromotion;
