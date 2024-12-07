// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setCart } from "@/redux/slice/cartSlice";
import {
  CartCustomerType,
  CartProductsToBuyFrontType,
} from "@/types/cart/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/giftcard/GiftcardTypes";

const useCart = () => {
  const [productsInCart, setProductsInCart] = useState<
    CartProductsToBuyFrontType[] | null
  >(null);
  const [giftcardsInCart, setGiftcardsInCart] = useState<
    CartGiftcardsToBuyFrontType[] | null
  >(null);
  const dispatch = useDispatch();
  const { isAuthenticated, isVisitor } = useSelector(
    (state: RootState) => state.auth
  );
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { data, triggerFetch } = useFetch<CartCustomerType>("/customer", {
    requiredCredentials: true,
  });
  useEffect(() => {
    // Récupération initiale du panier pour les utilisateurs authentifiés
    if (isAuthenticated) {
      triggerFetch();
    }
  }, [isAuthenticated, triggerFetch]);
  useEffect(() => {
    if (isAuthenticated && data) {
      setProductsInCart(data.cartProducts);
      setGiftcardsInCart(data.cartGiftcards);
      dispatch(
        setCart({
          cartProducts: data.cartProducts,
          cartGiftcards: data.cartGiftcards,
        })
      );
    }
  }, [data, isAuthenticated, dispatch]);
  useEffect(() => {
    if (isVisitor && cartCustomer) {
      setProductsInCart(cartCustomer.cartProducts);
      setGiftcardsInCart(cartCustomer.cartGiftcards);
    }
  }, [isVisitor, cartCustomer]);

  return {
    productsInCart,
    setProductsInCart,
    giftcardsInCart,
    setGiftcardsInCart,
  };
};

export default useCart;
