import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemsType, CartResponse } from "@/app/(public)/types/CartTypes";
import { Product, ProductCartGiftcards } from "@/app/(public)/types/ProductTypes";

// Types
interface ProductProps {
  product?: Product;
  selectedVariant: string;
  quantity: number;
  amount?: number;
  type: "item" | "giftCard";
}
interface AmountBeforeDiscountType {
  amount: number;
}

const initialState: CartResponse & {
  totalItemsCount: number;
  amountBeforeDiscount: number;
} = {
  cart: undefined,
  items: [],
  giftCards: [],
  totalItemsCount: 0,
  amountBeforeDiscount: 0,
};

const calculateTotalItemsCount = (
  items: CartItemsType[],
  giftCards: ProductCartGiftcards[]
) => {
  const itemsCount = items.reduce((acc, item) => acc + item.quantityInCart, 0);
  const giftCardsCount = giftCards.reduce(
    (acc, giftCard) => acc + giftCard.quantity,
    0
  );
  return itemsCount + giftCardsCount;
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartResponse>) => ({
      ...state,
      cart: action.payload.cart,
      items: action.payload.items,
      giftCards: action.payload.giftCards,
      totalItemsCount: calculateTotalItemsCount(
        action.payload.items,
        action.payload.giftCards
      ),
    }),

    addProduct: (state, action: PayloadAction<ProductProps>) => {
      const { product, selectedVariant, quantity, amount, type } =
        action.payload;

      if (type === "item" && product) {
        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.id === product.id &&
            (selectedVariant ? item.selectedVariant === selectedVariant : true)
        );

        const updatedItems =
          existingItemIndex !== -1
            ? state.items.map((item, index) =>
                index === existingItemIndex
                  ? { ...item, quantityInCart: quantity }
                  : item
              )
            : [
                ...state.items,
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

        return {
          ...state,
          items: updatedItems,
          totalItemsCount: calculateTotalItemsCount(
            updatedItems,
            state.giftCards
          ),
        };
      }

      if (type === "giftCard" && amount) {
        const updatedGiftCards = [
          ...state.giftCards,
          {
            amount,
            quantity,
            id: Math.floor(Math.random() * 1000000) + Date.now(),
            cart_id: 0,
            created_at: "",
            updated_at: "",
          },
        ];

        return {
          ...state,
          giftCards: updatedGiftCards,
          totalItemsCount: calculateTotalItemsCount(
            state.items,
            updatedGiftCards
          ),
        };
      }

      return state;
    },

    deleteProduct: (
      state,
      action: PayloadAction<{
        productId: number;
        variant: string | null;
        type: "item" | "giftCard";
      }>
    ) => {
      const { productId, variant, type } = action.payload;

      const updatedItems =
        type === "item"
          ? state.items.filter(
              (item) =>
                !(item.id === productId && item.selectedVariant === variant)
            )
          : state.items;

      const updatedGiftCards =
        type === "giftCard"
          ? state.giftCards.filter((giftCard) => giftCard.id !== productId)
          : state.giftCards;

      return {
        ...state,
        items: updatedItems,
        giftCards: updatedGiftCards,
        totalItemsCount: calculateTotalItemsCount(
          updatedItems,
          updatedGiftCards
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
      state.cart = undefined;
      state.items = [];
      state.giftCards = [];
      state.totalItemsCount = 0;
      state.amountBeforeDiscount = 0;
    },
  },
});

// Actions exportées
export const {
  setCart,
  addProduct,
  deleteProduct,
  clearCart,
  setAmountBeforeDiscount,
} = cartSlice.actions;

// Réduire exporté pour le store
export default cartSlice.reducer;
