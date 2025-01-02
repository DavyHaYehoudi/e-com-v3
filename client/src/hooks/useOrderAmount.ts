// hooks/useOrderAmount.ts
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { setAmountBeforeDiscount } from "@/redux/slice/cartSlice";
import { PaymentAmountResponse } from "@/types/PaymentTypes";

export const useOrderAmount = () => {
  const [orderAmount, setOrderAmount] = useState(0);
  const dispatch = useDispatch();

  const giftcardsToUse = useSelector(
    (state: RootState) => state.priceAdjustments.giftcards
  );
  const promocode = useSelector(
    (state: RootState) => state.priceAdjustments.promocode
  );
  const cashbackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const emailCustomer = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const cart = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const bodyData = {
    emailCustomer,
    cartProducts: cart.cartProducts,
    cartGiftcards: cart.cartGiftcards,
    giftcardsToUse,
    promocode: promocode.code,
    cashbackToSpend,
  };

  // Utilisation de useFetch pour obtenir le montant de la commande
  const { triggerFetch: triggerFetchForCustomer } =
    useFetch<PaymentAmountResponse>(`/payment/customer/amount`, {
      method: "POST",
      requiredCredentials: true,
    });
  const { triggerFetch: triggerFetchForVisitor } =
    useFetch<PaymentAmountResponse>(`/payment/amount`, {
      method: "POST",
      requiredCredentials: false,
    });

  const getOrderAmount = useCallback(async () => {
    try {
      const order = isAuthenticated
        ? await triggerFetchForCustomer(bodyData)
        : await triggerFetchForVisitor(bodyData);
      if (order) {
        setOrderAmount(order.orderAmount);
        dispatch(
          setAmountBeforeDiscount({ amount: order.totalAmountBeforePromocode })
        );
      }
    } catch (error) {
      console.log("Erreur dans useOrderAmount pour getOrderAmount :", error);
    }
  }, [
    triggerFetchForCustomer,
    triggerFetchForVisitor,
    dispatch,
    promocode,
    giftcardsToUse,
    cashbackToSpend,
  ]);

  return { getOrderAmount, orderAmount };
};
