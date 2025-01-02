import {
  CartCustomerFrontType,
  CartProductsToBuyFrontType,
} from "@/types/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/GiftcardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AmountBeforeDiscountType {
  amount: number;
}

const initialState: CartCustomerFrontType & {
  totalItemsCount: number;
  amountBeforeDiscount: number;
} = {
  cartProducts: [],
  cartGiftcards: [],
  totalItemsCount: 0,
  amountBeforeDiscount: 0,
};

const calculateTotalItemsCount = (
  cartProducts: CartProductsToBuyFrontType[],
  cartGiftcards: CartGiftcardsToBuyFrontType[]
) => {
  const productsCount = cartProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const giftcardsCount = cartGiftcards.reduce(
    (acc, giftCard) => acc + giftCard.quantity,
    0
  );
  return productsCount + giftcardsCount;
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartCustomerFrontType>) => {
      const { cartProducts, cartGiftcards } = action.payload;

      // Met à jour les produits du panier
      state.cartProducts = cartProducts || state.cartProducts;

      // Met à jour les giftcards du panier
      state.cartGiftcards = cartGiftcards || state.cartGiftcards;

      // Recalcule le total des items
      state.totalItemsCount = calculateTotalItemsCount(
        state.cartProducts,
        state.cartGiftcards
      );
    },
    addProductToCart: (
      state,
      action: PayloadAction<CartProductsToBuyFrontType>
    ) => {
      const {
        productId,
        variant,
        quantity,
        name,
        heroImage,
        newUntil,
        price,
        promotionEndDate,
        promotionPercentage,
        cashback,
      } = action.payload;

      const existingItemIndex = state.cartProducts.findIndex(
        (item) =>
          item.productId === productId &&
          (variant ? item.variant === variant : true)
      );

      const updatedItems =
        existingItemIndex !== -1
          ? state.cartProducts.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity } : item
            )
          : [
              ...state.cartProducts,
              {
                productId,
                variant,
                quantity,
                name,
                heroImage,
                newUntil,
                price,
                promotionEndDate,
                promotionPercentage,
                cashback,
              },
            ];

      return {
        ...state,
        cartProducts: updatedItems,
        totalItemsCount: calculateTotalItemsCount(
          updatedItems,
          state.cartGiftcards
        ),
      };
    },
    addGiftcardToCart: (
      state,
      action: PayloadAction<{ amount: number; quantity: number }>
    ) => {
      const { amount, quantity } = action.payload;
      const updatedGiftCards = [
        ...state.cartGiftcards,
        {
          idTemp: Math.floor(Math.random() * 1000000) + Date.now(),
          amount,
          quantity,
        },
      ];

      return {
        ...state,
        cartGiftcards: updatedGiftCards,
        totalItemsCount: calculateTotalItemsCount(
          state.cartProducts,
          updatedGiftCards
        ),
      };
    },
    deleteGiftcardToCart: (state, action: PayloadAction<number>) => {
      const updatedGiftCards = state.cartGiftcards.filter(
        (giftCard) => giftCard.idTemp !== action.payload
      );

      return {
        ...state,
        cartGiftcards: updatedGiftCards,
        totalItemsCount: calculateTotalItemsCount(
          state.cartProducts,
          updatedGiftCards
        ),
      };
    },
    deleteProductToCart: (
      state,
      action: PayloadAction<{
        productId: string;
        variant: string | null;
      }>
    ) => {
      const { productId, variant } = action.payload;

      const updatedItems = state.cartProducts.filter(
        (item) => !(item.productId === productId && item.variant === variant)
      );

      return {
        ...state,
        cartProducts: updatedItems,
        totalItemsCount: calculateTotalItemsCount(
          updatedItems,
          state.cartGiftcards
        ),
      };
    },
    setAmountBeforeDiscount: (
      state,
      action: PayloadAction<AmountBeforeDiscountType>
    ) => {
      state.amountBeforeDiscount = action.payload.amount;
    },

    clearCart: (state) => {
      state.cartProducts = [];
      state.cartGiftcards = [];
      state.totalItemsCount = 0;
      state.amountBeforeDiscount = 0;
    },
  },
});

// Actions exportées
export const {
  setCart,
  addProductToCart,
  addGiftcardToCart,
  deleteProductToCart,
  deleteGiftcardToCart,
  clearCart,
  setAmountBeforeDiscount,
} = cartSlice.actions;

// Réduire exporté pour le store
export default cartSlice.reducer;
