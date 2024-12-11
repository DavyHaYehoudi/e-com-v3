import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  resetAmountTotalGiftcardsToUse,
  setCashBackToSpend,
  setGiftCard,
  setPromocode,
} from "@/redux/slice/priceAdjustmentsSlice";
import CartTable from "./CartTable";
import ProceedToPayment from "./ProceedToPayment";
import { calculateTotalCashbackCartToEarn } from "@/utils/cartCalculs";
import { useCartManager } from "@/hooks/useCartManager";

const CartPage = () => {
  const { removeProductInCart, removeGiftcardInCart } = useCartManager();

  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards } = cartCustomer;
  const dispatch = useDispatch();
  // Réinitiliasation du store en cas de retour sur la page
  dispatch(setPromocode({ code: "", amountDeducted: 0, percentage: 0 }));
  dispatch(setGiftCard({ _id: "", code: "", type: "reset", balance: 0 }));
  dispatch(setCashBackToSpend(0));
  dispatch(resetAmountTotalGiftcardsToUse());
  return (
    <main>
      <h1 className="uppercase text-center m-10">mon panier</h1>
      <section className="w-full flex justify-center">
        {cartProducts &&
        (cartProducts.length > 0 || cartGiftcards.length > 0) ? (
          <div className="w-full sm:w-full lg:w-3/4 2xl:w-1/2">
            <CartTable
              cartProducts={cartProducts}
              cartGiftcards={cartGiftcards}
              removeProductInCart={removeProductInCart}
              removeGiftcardInCart={removeGiftcardInCart}
            />
            {calculateTotalCashbackCartToEarn(cartProducts) >= 0 && (
              <ProceedToPayment cartProducts={cartProducts} />
            )}
          </div>
        ) : (
          <p className="uppercase">le panier est vide</p>
        )}
      </section>
    </main>
  );
};

export default CartPage;
