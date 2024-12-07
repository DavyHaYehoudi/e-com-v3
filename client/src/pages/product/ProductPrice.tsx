import AddToCartButton from "@/components/shared/AddToCartButton";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import { ProductDBType } from "@/types/product/ProductTypes";
import { formatPrice } from "@/utils/pricesFormat";
import {
  canContinueSelling,
  priceProductAfterDiscount,
} from "@/utils/productUtils";

interface ProductPriceProps {
  product: ProductDBType;
  selectedVariant: string;
  quantity: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  product,
  selectedVariant,
  quantity,
}) => {
  return (
    <article className="my-8">
      <h2 className="text-xl font-semibold">💶 Prix :</h2>
      {product.promotionPercentage ? (
        <>
          <div className="flex items-center gap-2 m-5">
            {/* Prix original barré avec un style en gris */}
            <del className="text-gray-500">{formatPrice(product.price)}</del>
            &nbsp;
            {/* Prix après réduction avec un style en rouge et gras */}
            <span className="text-red-600 font-bold">
              {formatPrice(priceProductAfterDiscount(product))}
            </span>
            <PromotionBadge
              promotionPercentage={product.promotionPercentage}
              promotionEndDate={product.promotionEndDate}
            />
          </div>
          <hr className="my-4" />
        </>
      ) : (
        ""
      )}
      <div className="flex items-center gap-5">
        {product.price && !product.promotionPercentage && (
          <div>{formatPrice(product.price)} </div>
        )}
        {product.cashback ? (
          <div>
            {product.cashback ? (
              <CashbackBadge cashbackAmount={product.cashback} />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <hr className="my-4" />
      </div>
      {/* Vérification si le produit est disponible à la vente */}
      {canContinueSelling(product) ? (
        <div className="my-5">
          <AddToCartButton
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            type="product"
          />
        </div>
      ) : (
        <div className="mx-auto block w-1/2 text-red-600 font-bold text-center">
          Epuisé...
        </div>
      )}
    </article>
  );
};

export default ProductPrice;
