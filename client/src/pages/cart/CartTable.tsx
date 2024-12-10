import { Table, TableBody, TableFooter } from "@/components/ui/table";
import CartRowGiftcard from "./CartRowGiftcard";
import ProductsBeforePromotion from "./rowTotals/ProductsBeforePromotion";
import RowPromotion from "./rowTotals/RowPromotion";
import RowGiftcardToUse from "./rowTotals/giftcardToUse/RowGiftcardToUse";
import RowCodePromo from "./rowTotals/codePromo/RowCodePromo";
import RowTotalCart from "./rowTotals/RowTotalCart";
import RowCashbackToUse from "./rowTotals/cashback/RowCashbackToUse";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { usePromotion } from "@/hooks/usePromotion";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/giftcard/GiftcardTypes";
import CartRowProduct from "./CartRowProduct";

interface CartRowItemProps {
  cartProducts: CartProductsToBuyFrontType[];
  cartGiftcards: CartGiftcardsToBuyFrontType[];
  removeProductInCart: (productId: string, variant: string | null) => void;
  removeGiftcardInCart: (idTemp: number) => void;
}
const CartTable: React.FC<CartRowItemProps> = ({
  cartProducts,
  cartGiftcards,
  removeProductInCart,
  removeGiftcardInCart,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const giftcardsToUse = useSelector(
    (state: RootState) => state.priceAdjustments.giftcards
  );

  const {
    codePromoPercentage,
    selectedCashback,
    applyDiscount,
    handleCashbackSelect,
  } = usePromotion();

  const onPromotion = (promotionPercentage: number) => {
    applyDiscount(promotionPercentage);
  };

  return (
    <Table>
      <TableBody>
        <CartRowProduct
          cartProducts={cartProducts}
          removeProductInCart={removeProductInCart}
        />
        <CartRowGiftcard
          cartGiftcards={cartGiftcards}
          removeGiftcardInCart={removeGiftcardInCart}
        />
      </TableBody>
      <TableFooter>
        <ProductsBeforePromotion
          cartProducts={cartProducts}
          cartGiftcards={cartGiftcards}
        />
        <RowPromotion cartProducts={cartProducts} />
        <RowCodePromo
          onPromotion={onPromotion}
          codePromoPercentage={codePromoPercentage}
          cartProducts={cartProducts}
          cartGiftcards={cartGiftcards}
        />
        {isAuthenticated && (
          <RowCashbackToUse
            onCashbackSelect={handleCashbackSelect}
            selectedCashback={selectedCashback}
          />
        )}
        <RowGiftcardToUse giftcardsToUse={giftcardsToUse} />
        <RowTotalCart
          cartProducts={cartProducts}
          cartGiftcards={cartGiftcards}
          giftcardsToUse={giftcardsToUse}
          codePromoPercentage={codePromoPercentage}
          selectedCashback={selectedCashback}
        />
      </TableFooter>
    </Table>
  );
};
export default CartTable;
