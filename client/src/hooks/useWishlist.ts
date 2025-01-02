import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "@/redux/slice/wishlistSlice";
import { RootState } from "@/redux/store/store";
import { CustomerDBType } from "@/types/CustomerTypes";
import { WishlistManagerFrontType } from "@/types/WishlistTypes";

const useWishlist = () => {
  const [productsWishlist, setProductsWishlist] = useState<
    WishlistManagerFrontType[] | null
  >(null);
  const dispatch = useDispatch();
  const { isAuthenticated, isVisitor } = useSelector(
    (state: RootState) => state.auth
  );
  const wishlistCustomer = useSelector((state: RootState) => state.wishlist);
  const { data, triggerFetch } = useFetch<CustomerDBType>("/customer", {
    requiredCredentials: true,
  });

  // Fonction pour formater les données de la wishlist
  const formatWishlistData = (
    wishlistProducts: CustomerDBType["wishlistProducts"]
  ): WishlistManagerFrontType[] => {
    return wishlistProducts.map((product) => ({
      _id: product._id,
      heroImage: product.heroImage,
      name: product.name,
      newUntil: product.newUntil,
      price: product.price,
      cashback: product.cashback,
      promotionPercentage: product.promotionPercentage,
      promotionEndDate: product.promotionEndDate,
    }));
  };
  const getWishlistCustomer = async () => {
    await triggerFetch();
  };
  useEffect(() => {
    // Récupération initiale de la wishlist pour les utilisateurs authentifiés
    if (isAuthenticated) {
      triggerFetch();
    }
  }, [isAuthenticated, triggerFetch]);

  useEffect(() => {
    if (isAuthenticated && data) {
      const formattedWishlist = formatWishlistData(data.wishlistProducts);
      setProductsWishlist(formattedWishlist);
      dispatch(setWishlist(formattedWishlist));
    }
  }, [data, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isVisitor && wishlistCustomer) {
      setProductsWishlist(wishlistCustomer);
    }
  }, [isVisitor, wishlistCustomer]);

  return { productsWishlist, setProductsWishlist, getWishlistCustomer };
};

export default useWishlist;
