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
      <TableRow
        key={index}
        className="border-b border-gray-500 relative overflow-x-auto"
      >
        <TableCell className="flex flex-col items-start font-medium my-4">
          <ProductImageItem
            productId={product._id}
            name={product.name}
            path={product.heroImage}
            width="100px"
            height="100px"
          />{" "}
          {isProductNew(product.newUntil) && <NewBadge />}
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>
          <div className="flex gap-2 items-center">
            {/* Prix */}
            <span className="whitespace-nowrap">
              {" "}
              {formatPrice(product.price)}
            </span>
            {/* Badge de promotion */}
            {isProductOnSale(
              product.promotionPercentage,
              product.promotionEndDate
            ) ? (
              <PromotionBadge
                promotionPercentage={product.promotionPercentage}
              />
            ) : (
              ""
            )}
            {/* Badge de cashback */}
            {product.cashback ? (
              <CashbackBadge cashbackAmount={product.cashback} />
            ) : (
              ""
            )}
          </div>
        </TableCell>
        <TableCell>
          <FavoriteButton product={product} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default WishlistRowItem;
