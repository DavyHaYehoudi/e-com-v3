import TrashIcon from "@/components/shared/TrashIcon";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { CartGiftcardsToBuyFrontType } from "@/types/GiftcardTypes";
import { sumPriceArticle } from "@/utils/pricesFormat";

interface SheetRowGiftcardProps {
  giftcardsInCart: CartGiftcardsToBuyFrontType[] | null;
  removeGiftcardInCart: (idTemp: number) => void;
}
const SheetRowGiftcard: React.FC<SheetRowGiftcardProps> = ({
  giftcardsInCart,
  removeGiftcardInCart,
}) => {
  return (
    giftcardsInCart &&
    giftcardsInCart.length > 0 &&
    giftcardsInCart.map((giftcard, index) => (
      <div
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
          {/* Première cellule : image et nom */}
          <div className="font-medium relative">
            <ProductImageGiftcard amount={giftcard.amount} />
          </div>

          <div>Carte cadeau pour soi ou à offrir.</div>
        </div>
        <div className="flex items-center justify-between p-2 my-2">
          <div>{sumPriceArticle(giftcard.quantity, giftcard.amount)}</div>

          {/* Cellule pour le bouton de suppression */}
        </div>
        <div className="flex justify-center my-2">
          <TrashIcon onClick={() => removeGiftcardInCart(giftcard.idTemp)} />
        </div>
      </div>
    ))
  );
};

export default SheetRowGiftcard;
