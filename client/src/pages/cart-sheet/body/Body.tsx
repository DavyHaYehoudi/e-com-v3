import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useCartManager } from "@/hooks/useCartManager";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

const Body = () => {
  const { removeProductInCart, removeGiftcardInCart, isLoading } = useCartManager();
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards } = cartCustomer;

  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <>
      <SheetRowItem
        productsInCart={cartProducts}
        removeProductInCart={removeProductInCart}
      />
      <SheetRowGiftcard
        giftcardsInCart={cartGiftcards}
        removeGiftcardInCart={removeGiftcardInCart}
      />
    </>
  );
};

export default Body;
