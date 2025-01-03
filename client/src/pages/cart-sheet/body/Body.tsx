import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useCartManager } from "@/hooks/useCartManager";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Body = () => {
  const { removeProductInCart, removeGiftcardInCart, isLoading } = useCartManager();
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards } = cartCustomer;

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
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
