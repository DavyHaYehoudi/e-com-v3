import { TableCell, TableRow } from "@/components/ui/table";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import NewBadge from "@/components/shared/badge/NewBadge";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import { formatPrice } from "@/utils/pricesFormat";
import { isProductNew, isProductOnSale } from "@/utils/productUtils";
import { WishlistManagerFrontType } from "@/types/WishlistTypes";

interface WislistRowItemProps {
  productsWishlistItems: WishlistManagerFrontType[];
}
const WishlistRowItem: React.FC<WislistRowItemProps> = ({
  productsWishlistItems,
}) => {
  return (
    productsWishlistItems &&
    productsWishlistItems.length > 0 &&
    productsWishlistItems.map((product, index) => (
      <TableRow key={index} className="border-b border-gray-500 relative">
        <TableCell className="font-medium relative">
          <ProductImageItem
            productId={product._id}
            name={product.name}
            path={product.heroImage}
          />{" "}
          {isProductNew(product.newUntil) && (
            <NewBadge additionalClasses="absolute top-1 left-0" />
          )}
        </TableCell>
        <TableCell>
          {product.name} <br />
        </TableCell>
        <TableCell>
          {formatPrice(product.price)} {/* Badge de promotion */}
          {isProductOnSale(
            product.promotionPercentage,
            product.promotionEndDate
          ) && (
            <PromotionBadge promotionPercentage={product.promotionPercentage} />
          )}
          <br />
          {/* Badge de cashback */}
          {product.cashback && (
            <CashbackBadge cashbackAmount={product.cashback} />
          )}
        </TableCell>
        <TableCell>
          <FavoriteButton product={product} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default WishlistRowItem;
