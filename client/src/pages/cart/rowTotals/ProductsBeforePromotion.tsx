import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/pricesFormat";
import { calculateTotalCartBeforeDiscount } from "@/utils/cartCalculs";
import { CartProductsToBuyFrontType } from "@/types/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/GiftcardTypes";

interface ProductsBeforePromotionProps {
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
}

const ProductsBeforePromotion: React.FC<ProductsBeforePromotionProps> = ({
  cartProducts,
  cartGiftcards,
}) => {
  return (
    <TableRow>
      <TableCell className="border-b border-gray-500" colSpan={5}>
        Total des produits
      </TableCell>
      <TableCell className="text-right border-b border-gray-500">
        <span className="whitespace-nowrap">
          {" "}
          {formatPrice(
            calculateTotalCartBeforeDiscount(cartProducts, cartGiftcards)
          )}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default ProductsBeforePromotion;
