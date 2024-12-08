import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  addGiftcardToCart,
  addProductToCart,
  deleteGiftcardToCart,
  deleteProductToCart,
} from "@/redux/slice/cartSlice";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";

export const useCartManager = () => {
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards } = cartCustomer;
  const { triggerFetch } = useFetch("/customer", {
    method: "PATCH",
    requiredCredentials: true,
  });
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Ajouter ou mettre à jour un produit dans le panier
  const addOrUpdateProductInCart = async ({
    productId,
    variant,
    quantity,
    name,
    heroImage,
    newUntil,
    price,
    promotionPercentage,
    promotionEndDate,
    cashback,
  }: CartProductsToBuyFrontType) => {
    // Vérifier si le produit existe déjà dans les items du panier
    const existingItemIndex = cartProducts.findIndex(
      (item) =>
        item.productId === productId &&
        (variant ? item.variant === variant : true)
    );

    if (existingItemIndex !== -1) {
      // Le produit existe - Mettre à jour la quantité de l'article existant
      const itemsCopy = cartProducts.map(
        (item, index) =>
          index === existingItemIndex
            ? { ...item, quantity } // Mise à jour de l'item ciblé
            : item // Conserver les autres items
      );

      if (isAuthenticated) {
        await triggerFetch({ cartProducts: itemsCopy }); // Envoi à l'API
      }
    } else {
      // Le produit n'existe pas - Ajouter un nouvel item
      const newCartProducts = [
        ...cartProducts,
        {
          productId,
          quantity,
          variant,
          name,
          heroImage,
          newUntil,
          price,
          promotionPercentage,
          promotionEndDate,
          cashback,
        },
      ];

      if (isAuthenticated) {
        await triggerFetch({ cartProducts: newCartProducts });
      }
    }

    dispatch(
      addProductToCart({
        productId,
        variant,
        quantity,
        name,
        heroImage,
        newUntil,
        price,
        promotionPercentage,
        promotionEndDate,
        cashback,
      })
    );
  };
  const addGiftcardInCart = async (amount: number, quantity: number) => {
    const cartGiftcardsCopy = [...cartGiftcards];
    const giftcardToAdd = {
      idTemp: Math.floor(Math.random() * 1000000),
      amount,
      quantity,
    };
    const newCartGiftcards = [...cartGiftcardsCopy, giftcardToAdd];
    if (isAuthenticated) {
      await triggerFetch({
        cartGiftcards: newCartGiftcards,
      }); // Envoi à l'API
    }
    dispatch(addGiftcardToCart(giftcardToAdd));
  };
  // Retirer un produit du panier
  const removeProductInCart = async (
    productId: string,
    variant: string | null
  ) => {
    const updatedItems =
      cartProducts.filter(
        (item) => !(item.productId === productId && item.variant === variant)
      ) || [];

    // Envoi à l’API avec le format correct
    if (isAuthenticated) {
      await triggerFetch({ cartProducts: updatedItems });
    }
    dispatch(deleteProductToCart({ productId, variant }));
  };
  // Retirer une carte cadeau du panier
  const removeGiftcardInCart = async (idTemp: number) => {
    const updatedGiftCards =
      cartGiftcards.filter((giftCard) => giftCard.idTemp !== idTemp) || [];

    // Envoi à l’API avec le format correct
    if (isAuthenticated) {
      await triggerFetch({ cartGiftcards: updatedGiftCards });
    }
    dispatch(deleteGiftcardToCart(idTemp));
  };

  return {
    addOrUpdateProductInCart,
    addGiftcardInCart,
    removeProductInCart,
    removeGiftcardInCart,
    cartProducts,
    cartGiftcards,
  };
};
