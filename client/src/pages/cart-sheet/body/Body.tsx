import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useCartManager } from "@/hooks/useCartManager";

const Body = () => {
  const { removeProductInCart, removeGiftcardInCart } = useCartManager();
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards } = cartCustomer;

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
