import NewBadge from "@/components/shared/badge/NewBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import CartRowPromotionPrice from "../../cart/CartRowPromotionPrice";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import TrashIcon from "@/components/shared/TrashIcon";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import { CartResponse } from "@/app/(public)/types/CartTypes";
import { sumPriceArticle } from "@/utils/pricesFormat";
import { isProductNew } from "@/utils/productUtils";

interface SheetRowItemProps {
  productsInCart: CartResponse | null;
  removeProduct: (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => void;
}
const SheetRowItem: React.FC<SheetRowItemProps> = ({
  productsInCart,
  removeProduct,
}) => {
  return (
    productsInCart &&
    productsInCart.items &&
    productsInCart.items.length > 0 &&
    productsInCart.items.map((product, index) => (
      <div
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
          {/* Première cellule : image et nom */}
          <div className="font-medium relative">
            <ProductImageItem
              productId={product.id}
              name={product.name}
              path={product?.images?.find((image) => image.is_main)?.url || ""}
            />
            {isProductNew(product.new_until) && (
              <NewBadge additionalClasses="absolute top-1 left-0" />
            )}{" "}
          </div>

          <div>
            {product.name} <br />
            {product.selectedVariant && (
              <VariantBadge productVariant={product.selectedVariant} />
            )}{" "}
          </div>
        </div>
        <div className="flex items-center justify-between p-2 my-2 flex-wrap">
          <div>{sumPriceArticle(product.quantityInCart, product.price)}</div>
          {/* Cellule affichant le prix de la réduction */}
          <div className="text-right">
            <CartRowPromotionPrice
              quantity={product.quantityInCart}
              price={product.price}
              discount={product.discount_percentage}
            />
          </div>
          {/* Cellule pour Cashback */}
          <div>
            {product.cash_back ? (
              <CashbackBadge
                cashbackAmount={product.quantityInCart * product.cash_back}
              />
            ) : (
              ""
            )}
          </div>
          {/* Cellule pour le bouton de suppression */}
        </div>
        <div className="flex justify-center my-2">
          <TrashIcon
            onClick={() =>
              removeProduct(product.id, product.selectedVariant, "item")
            }
          />
        </div>
      </div>
    ))
  );
};

export default SheetRowItem;
