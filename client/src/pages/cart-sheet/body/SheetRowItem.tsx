import NewBadge from "@/components/shared/badge/NewBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import CartRowPromotionPrice from "../../cart/CartRowPromotionPrice";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import TrashIcon from "@/components/shared/TrashIcon";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import { sumPriceArticle } from "@/utils/pricesFormat";
import { isProductNew } from "@/utils/productUtils";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";

interface SheetRowItemProps {
  productsInCart: CartProductsToBuyFrontType[] | null;
  removeProductInCart: (
    productId: string,
    variant: string | null,
  ) => void;
}
const SheetRowItem: React.FC<SheetRowItemProps> = ({
  productsInCart,
  removeProductInCart,
}) => {  
  return (
    productsInCart &&
    productsInCart.length > 0 &&
    productsInCart.map((product, index) => (
      <div
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
          {/* Première cellule : image et nom */}
          <div className="font-medium relative">
            <ProductImageItem
              productId={product.productId}
              name={product.name}
              path={product.heroImage}
            />
            {isProductNew(product.newUntil) && (
              <NewBadge additionalClasses="absolute top-1 left-0" />
            )}{" "}
          </div>

          <div>
            {product.name} <br />
            {product.variant && (
              <VariantBadge productVariant={product.variant} />
            )}{" "}
          </div>
        </div>
        <div className="flex items-center justify-between p-2 my-2 flex-wrap">
          <div>{sumPriceArticle(product.quantity, product.price)}</div>
          {/* Cellule affichant le prix de la réduction */}
          <div className="text-right">
            <CartRowPromotionPrice
              quantity={product.quantity}
              price={product.price}
              promotionPercentage={product.promotionPercentage}
              promotionEndDate={product.promotionEndDate}
            />
          </div>
          {/* Cellule pour Cashback */}
          <div>
            {product.cashback ? (
              <CashbackBadge
                cashbackAmount={product.quantity * product.cashback}
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
              removeProductInCart(product.productId, product.variant)
            }
          />
        </div>
      </div>
    ))
  );
};

export default SheetRowItem;
