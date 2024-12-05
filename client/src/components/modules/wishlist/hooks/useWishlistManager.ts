import { useFetch } from "@/service/hooks/useFetch";
import { MasterProductsType, Product } from "@/app/(public)/types/ProductTypes";
import useWishlist from "./useWishlist";
import { useDispatch, useSelector } from "react-redux";
import { toggleItem } from "@/redux/slice/wishlistSlice";
import { RootState } from "@/redux/store/store";

export const useWishlistManager = () => {
  const { productsWishlist } = useWishlist();
  const { triggerFetch } = useFetch("/customer/wishlist", {
    method: "PATCH",
    requiredCredentials: true,
  });
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // Helper pour formater les items pour l'API
  const formatWishlistForAPI = (item: MasterProductsType) => ({
    items: [{ product_id: item.id }],
  });

  // Ajouter ou mettre à jour un produit dans la liste de favoris
  const toggleProductInWishlist = async (
    product: Product | MasterProductsType
  ) => {
    const newItem = {
      id: product.id,
      name: product.name,
      SKU: product.SKU,
      description: product.description,
      continue_selling: product.continue_selling,
      quantity_in_stock: product.quantity_in_stock,
      discount_percentage: product.discount_percentage,
      discount_end_date: product.discount_end_date,
      price: product.price,
      new_until: product.new_until,
      is_published: product.is_published,
      is_star: product.is_star,
      is_archived: false,
      images: [],
      main_image: product.main_image,
      categories: [],
      tags: [],
      variants: [],
      weight: product.weight,
      cash_back: product.cash_back,
      createdAt: "",
      updatedAt: "",
    };

    // Envoi à l'API pour les utilisateurs authentifiés
    if (isAuthenticated) {
      await triggerFetch(formatWishlistForAPI(newItem));
    }
    dispatch(toggleItem(newItem));
  };

  return {
    toggleProductInWishlist,
    productsWishlist,
  };
};
