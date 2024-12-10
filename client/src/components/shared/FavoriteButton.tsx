import { Heart } from "lucide-react";
import { useWishlistManager } from "../../hooks/useWishlistManager";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { ProductDBType } from "@/types/product/ProductTypes";
import { WishlistManagerFrontType } from "@/types/wishlist/WishlistTypes";

interface FavoriteButtonProps {
  product: ProductDBType | WishlistManagerFrontType;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const { toggleProductInWishlist } = useWishlistManager();

  const wishlistItems = useSelector((state: RootState) => state.wishlist);

  // Déterminer si le produit est dans les favoris
  const isFavorite = wishlistItems.some((item) => item._id === product._id);

  const onToggleFavorite = async () => {
    const formatProduct = {
      _id: product._id,
      name: product.name,
      promotionPercentage: product.promotionPercentage,
      promotionEndDate: product.promotionEndDate,
      price: product.price,
      newUntil: product.newUntil,
      heroImage: product.heroImage,
      cashback: product.cashback,
    };
    await toggleProductInWishlist(formatProduct, wishlistItems);
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
