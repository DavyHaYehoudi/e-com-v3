// src/hooks/useWishlist.ts
import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { WishlistResponse } from "@/app/(public)/types/WishlistTypes";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "@/redux/slice/wishlistSlice";
import { RootState } from "@/redux/store/store";

const useWishlist = () => {
  const [productsWishlist, setProductsWishlist] =
    useState<WishlistResponse | null>(null);
  const dispatch = useDispatch();
  const { isAuthenticated, isVisitor } = useSelector(
    (state: RootState) => state.auth
  );
  const wishlistCustomer = useSelector((state: RootState) => state.wishlist);
  const { data, triggerFetch } = useFetch<WishlistResponse>(
    "/customer/wishlist",
    { requiredCredentials: true }
  );

  useEffect(() => {
    // Récupération initiale de la wishlist pour les utilisateurs authentifiés
    if (isAuthenticated) {
      triggerFetch();
    }
  }, [isAuthenticated, triggerFetch]);

  useEffect(() => {
    if (isAuthenticated && data) {
      setProductsWishlist(data);
      dispatch(setWishlist(data));
    }
  }, [data, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isVisitor && wishlistCustomer) {
      setProductsWishlist(wishlistCustomer);
    }
  }, [isVisitor, wishlistCustomer]);

  return { productsWishlist, setProductsWishlist };
};

export default useWishlist;
