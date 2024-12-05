import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useCartManager } from "@/hooks/useCartManager";

const Body = () => {
  const { removeProduct } = useCartManager();
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cart, items, giftCards } = cartCustomer;
  const productsInCart = { cart, items, giftCards };

  return (
    <>
      <SheetRowItem
        productsInCart={productsInCart}
        removeProduct={removeProduct}
      />
      <SheetRowGiftcard
        productsInCart={productsInCart}
        removeProduct={removeProduct}
      />
    </>
  );
};

export default Body;
