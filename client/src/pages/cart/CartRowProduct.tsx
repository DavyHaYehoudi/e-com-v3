import { useState, useEffect } from "react";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import NewBadge from "@/components/shared/badge/NewBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import CartRowPromotionPrice from "./CartRowPromotionPrice";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import { isProductNew } from "@/utils/productUtils";
import { sumPriceArticle } from "@/utils/pricesFormat";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";

interface CartRowProductProps {
  cartProducts: CartProductsToBuyFrontType[];
  removeProduct: (productId: string, variant: string | null) => void;
}
const CartRowProduct: React.FC<CartRowProductProps> = ({
  cartProducts,
  removeProduct,
}) => {
  // Initialiser l'état des quantités avec l'ID et le variant du produit comme clé
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialiser les quantités depuis cartProducts une seule fois lors du chargement du composant
    if (cartProducts) {
      const initialQuantities = cartProducts.reduce((acc, product) => {
        const key = `${product.productId}-${product.variant || "default"}`;
        acc[key] = product.quantity || 1;
        return acc;
      }, {} as { [key: string]: number });
      setQuantities(initialQuantities);
    }
  }, [cartProducts]);

  return (
    cartProducts &&
    cartProducts.length > 0 &&
    cartProducts.map((product) => {
      const key = `${product.productId}-${product.variant || "default"}`;
      return (
        <TableRow
          key={key}
          className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
        >
          {/* Première cellule : image et nom */}
          <TableCell className="font-medium relative">
            <ProductImageItem
              productId={product.productId}
              name={product.name}
              path={product.heroImage}
            />
            {isProductNew(product.newUntil) && (
              <NewBadge additionalClasses="absolute top-1 left-0" />
            )}
          </TableCell>

          <TableCell>
            {product.name} <br />
            {product.variant && (
              <VariantBadge productVariant={product.variant} />
            )}
          </TableCell>

          {/* Cellule de la quantité et du prix */}
          <TableCell>
            <span className="whitespace-nowrap">
              {sumPriceArticle(quantities[key], product.price)}
            </span>
          </TableCell>

          {/* Cellule affichant le prix de la réduction */}
          <TableCell className="text-right">
            <CartRowPromotionPrice
              quantity={quantities[key] || 1}
              price={product.price}
              promotionPercentage={product.promotionPercentage}
              promotionEndDate={product.promotionEndDate}
            />
          </TableCell>

          {/* Cellule pour Cashback */}
          <TableCell>
            {product.cashback ? (
              <CashbackBadge
                cashbackAmount={(quantities[key] || 1) * product.cashback}
                additionalClasses="absolute top-1 right-0"
              />
            ) : (
              ""
            )}
          </TableCell>

          {/* Cellule pour le bouton de suppression */}
          <TableCell align="right">
            <TrashIcon
              onClick={() => removeProduct(product.productId, product.variant)}
            />
          </TableCell>
        </TableRow>
      );
    })
  );
};

export default CartRowProduct;
