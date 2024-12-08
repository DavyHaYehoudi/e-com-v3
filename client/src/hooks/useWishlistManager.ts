import { useFetch } from "@/service/hooks/useFetch";
import useWishlist from "./useWishlist";
import { useDispatch, useSelector } from "react-redux";
import { toggleItem } from "@/redux/slice/wishlistSlice";
import { RootState } from "@/redux/store/store";
import { WishlistManagerFrontType } from "@/types/wishlist/WishlistTypes";

export const useWishlistManager = () => {
  const { productsWishlist } = useWishlist();
  const { triggerFetch } = useFetch("/customer", {
    method: "PATCH",
    requiredCredentials: true,
  });
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Ajouter ou mettre à jour un produit dans la liste de favoris
  const toggleProductInWishlist = async (
    product: WishlistManagerFrontType,
    wishlistItems: WishlistManagerFrontType[]
  ) => {
    const newItem = {
      _id: product._id,
      name: product.name,
      promotionPercentage: product.promotionPercentage,
      promotionEndDate: product.promotionEndDate,
      price: product.price,
      newUntil: product.newUntil,
      heroImage: product.heroImage,
      cashback: product.cashback,
    };
    const wishlistItemsFormated = wishlistItems.map((item) => item._id);
    // Vérifier si le produit existe déjà dans la liste des favoris
    const existingId = wishlistItemsFormated.find((id) => id === product._id);

    // Le produit existe dans la liste des favoris
    if (existingId) {
      const newList = wishlistItemsFormated.filter((id) => id !== existingId);
      // Envoi à l'API pour les utilisateurs authentifiés
      if (isAuthenticated) {
        await triggerFetch({
          wishlistProducts: newList,
        });
      }
    } else {
      // Le produit n'existe pas dans la liste des favoris
      const newList = [...wishlistItemsFormated, newItem._id];
      // Envoi à l'API pour les utilisateurs authentifiés
      if (isAuthenticated) {
        await triggerFetch({
          wishlistProducts: newList,
        });
      }
    }

    dispatch(toggleItem(newItem));
  };

  return {
    toggleProductInWishlist,
    productsWishlist,
  };
};
