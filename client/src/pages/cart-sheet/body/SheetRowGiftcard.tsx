import TrashIcon from "@/components/shared/TrashIcon";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { CartResponse } from "@/app/(public)/types/CartTypes";
import { sumPriceArticle } from "@/utils/pricesFormat";

interface SheetRowGiftcardProps {
  productsInCart: CartResponse | null;
  removeProduct: (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => void;
}
const SheetRowGiftcard: React.FC<SheetRowGiftcardProps> = ({
  productsInCart,
  removeProduct,
}) => {
  return (
    productsInCart &&
    productsInCart.giftCards &&
    productsInCart.giftCards.length > 0 &&
    productsInCart.giftCards.map((product, index) => (
      <div
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
          {/* Première cellule : image et nom */}
          <div className="font-medium relative">
            <ProductImageGiftcard amount={product.amount} />
          </div>

          <div>Carte cadeau pour soi ou à offrir.</div>
        </div>
        <div className="flex items-center justify-between p-2 my-2">
          <div>{sumPriceArticle(product.quantity, product.amount)}</div>

          {/* Cellule pour le bouton de suppression */}
        </div>
        <div className="flex justify-center my-2">
          <TrashIcon
            onClick={() => removeProduct(product.id, null, "giftCard")}
          />
        </div>
      </div>
    ))
  );
};

export default SheetRowGiftcard;
