import React from "react";
import { Heart } from "lucide-react";
import { MasterProductsType, Product } from "@/app/(public)/types/ProductTypes";
import { useWishlistManager } from "../modules/wishlist/hooks/useWishlistManager";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface FavoriteButtonProps {
  product: Product | MasterProductsType;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const { toggleProductInWishlist } = useWishlistManager();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Déterminer si le produit est dans les favoris
  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  const onToggleFavorite = async () => {
    await toggleProductInWishlist(product);
  };

  return (
    <button
      className="absolute right-2 top-1/3 transform -translate-y-1/2"
      onClick={onToggleFavorite}
    >
      {isFavorite ? (
        <Heart
          className="h-7 w-7 animate-pulse"
          fill="currentColor"
          style={{ color: "var(--golden-2)" }}
        />
      ) : (
        <Heart className="h-7 w-7 text-gray-500" />
      )}
    </button>
  );
};

export default FavoriteButton;
