// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { CartResponse } from "@/app/(public)/types/CartTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setCart } from "@/redux/slice/cartSlice";

const useCart = () => {
  const [productsInCart, setProductsInCart] = useState<CartResponse | null>(
    null
  );
  const dispatch = useDispatch();
  const { isAuthenticated, isVisitor } = useSelector(
    (state: RootState) => state.auth
  );
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { data, triggerFetch } = useFetch<CartResponse>("/customer/cart", {
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
      setProductsInCart(data);
      dispatch(setCart(data));
    }
  }, [data, isAuthenticated, dispatch]);
  useEffect(() => {
    if (isVisitor && cartCustomer) {
      setProductsInCart(cartCustomer);
    }
  }, [isVisitor, cartCustomer]);

  return { productsInCart, setProductsInCart };
};

export default useCart;
