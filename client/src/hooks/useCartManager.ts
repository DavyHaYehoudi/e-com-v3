import { useFetch } from "@/service/hooks/useFetch";
import { CartItemsType } from "@/app/(public)/types/CartTypes";
import {
  MasterProductsType,
  Product,
  ProductCartGiftcards,
} from "@/app/(public)/types/ProductTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addProduct, deleteProduct } from "@/redux/slice/cartSlice";

interface ProductProps {
  product?: Product | MasterProductsType;
  selectedVariant: string;
  quantity: number;
  amount?: number;
  type: "item" | "giftCard";
}

export const useCartManager = () => {
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cart, items, giftCards } = cartCustomer;
  const productsInCart = { cart, items, giftCards };
  const { triggerFetch } = useFetch("/customer/cart", {
    method: "PUT",
    requiredCredentials: true,
  });
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // Helper pour formater les items pour l'API
  const formatCartForAPI = (
    items: CartItemsType[],
    giftCards: ProductCartGiftcards[]
  ) => ({
    items: items.map((item) => ({
      product_id: item.id,
      variant: item.selectedVariant,
      quantity: item.quantityInCart,
    })),
    gift_cards: giftCards.map((giftCard) => ({
      amount: giftCard.amount,
      quantity: giftCard.quantity,
    })),
  });

  // Ajouter ou mettre à jour un produit dans le panier
  const addOrUpdateProduct = async ({
    product,
    selectedVariant,
    quantity,
    amount,
    type,
  }: ProductProps) => {
    const updatedItems =
      type === "item" && product
        ? (() => {
            // Vérifier si le produit existe déjà dans les items du panier
            const existingItemIndex = productsInCart?.items.findIndex(
              (item) =>
                item.id === product.id &&
                (selectedVariant
                  ? item.selectedVariant === selectedVariant
                  : true)
            );

            if (existingItemIndex !== -1) {
              // Mettre à jour la quantité de l'article existant
              const itemsCopy = [...(productsInCart?.items || [])];
              itemsCopy[existingItemIndex] = {
                ...itemsCopy[existingItemIndex], // Copie de l'item existant
                quantityInCart: quantity, // Mise à jour de la quantité
              };
              return itemsCopy;
            } else {
              // Ajouter un nouvel item
              return [
                ...(productsInCart?.items || []),
                {
                  id: product.id,
                  selectedVariant,
                  quantityInCart: quantity,
                  name: product.name,
                  SKU: product.SKU,
                  description: product.description,
                  weight: product.weight,
                  continue_selling: product.continue_selling,
                  quantity_in_stock: product.quantity_in_stock,
                  discount_percentage: product.discount_percentage,
                  discount_end_date: product.discount_end_date,
                  price: product.price,
                  new_until: product.new_until,
                  cash_back: product.cash_back,
                  is_published: product.is_published,
                  is_star: product.is_star,
                  is_archived: product.isArchived,
                  images: [],
                  main_image: product.main_image,
                  categories: [],
                  tags: [],
                  variants: [],
                  created_at: "",
                  updated_at: "",
                },
              ];
            }
          })()
        : productsInCart?.items || [];

    const updatedGiftCards =
      type === "giftCard" && amount
        ? [
            ...(productsInCart?.giftCards || []),
            {
              amount,
              quantity,
              id: Math.floor(Math.random() * 1000000) + Date.now(), // ID aléatoire unique et temporaire
              cart_id: 0,
              created_at: "",
              updated_at: "",
            },
          ]
        : productsInCart?.giftCards || [];

    if (isAuthenticated) {
      await triggerFetch(formatCartForAPI(updatedItems, updatedGiftCards)); // Envoi à l'API
    }
    dispatch(addProduct({ product, selectedVariant, quantity, amount, type }));
  };

  // Retirer un produit du panier
  const removeProduct = async (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => {
    // Filtre pour supprimer un item selon le type spécifié
    const updatedItems =
      type === "item"
        ? productsInCart?.items.filter(
            (item) =>
              !(item.id === productId && item.selectedVariant === variant)
          ) || []
        : productsInCart?.items || [];

    const updatedGiftCards =
      type === "giftCard"
        ? productsInCart?.giftCards.filter(
            (giftCard) => giftCard.id !== productId
          ) || []
        : productsInCart?.giftCards || [];

    // Envoi à l’API avec le format correct
    if (isAuthenticated) {
      await triggerFetch(formatCartForAPI(updatedItems, updatedGiftCards));
    }
    dispatch(deleteProduct({ productId, variant, type }));
  };

  return {
    addOrUpdateProduct,
    removeProduct,
    productsInCart,
  };
};
