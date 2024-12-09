import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { sumPriceArticle } from "@/utils/pricesFormat";
import { CartGiftcardsToBuyFrontType } from "@/types/giftcard/GiftcardTypes";

interface CartRowGiftcardProps {
  cartGiftcards: CartGiftcardsToBuyFrontType[];
  removeGiftcardInCart: (idTemp: number) => void;
}
const CartRowGiftcard: React.FC<CartRowGiftcardProps> = ({
  cartGiftcards,
  removeGiftcardInCart,
}) => {
  return (
    cartGiftcards &&
    cartGiftcards.length > 0 &&
    cartGiftcards.map((giftcard, index) => (
      <TableRow
        key={index}
        className="hover:bg-gray-100 border-b border-gray-500 dark:hover:bg-[var(--dark-more)]"
      >
        {/* Première cellule : image et nom */}
        <TableCell className="font-medium relative">
          <ProductImageGiftcard amount={giftcard.amount} />
        </TableCell>

        <TableCell>Carte cadeau pour soi ou à offrir.</TableCell>

        {/* Cellule de la quantité et du prix */}
        <TableCell>
          <span className="whitespace-nowrap">
            {" "}
            {sumPriceArticle(giftcard.quantity, giftcard.amount)}
          </span>
        </TableCell>

        {/* Cellule vide pour le prix de la réduction */}
        <TableCell></TableCell>

        {/* Cellule vide pour Cashback */}
        <TableCell></TableCell>

        {/* Cellule pour le bouton de suppression */}
        <TableCell align="right">
          <TrashIcon onClick={() => removeGiftcardInCart(giftcard.idTemp)} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default CartRowGiftcard;
