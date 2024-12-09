// store/priceAdjustmentsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceAdjustmentsState {
  promoCode: string;
  giftCards: Array<string>;
  shippingMethod: number | null;
  cashBackToSpend: number | null;
  totalDiscount: number;
  totalFees: number;
  amountDiscountPromoCode: number;
  amountTotalGiftcardsToUse: number;
}

const initialState: PriceAdjustmentsState = {
  promoCode: "",
  giftCards: [],
  shippingMethod: null,
  cashBackToSpend: 0,
  totalDiscount: 0,
  totalFees: 0,
  amountDiscountPromoCode: 0,
  amountTotalGiftcardsToUse: 0,
};

const priceAdjustmentsSlice = createSlice({
  name: "priceAdjustments",
  initialState,
  reducers: {
    applyPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload;
    },
    setGiftCard(
      state,
      action: PayloadAction<{
        id?: string;
        code?: string;
        type: "add" | "remove" | "reset";
      }>
    ) {
      if (action.payload.type === "remove") {
        state.giftCards = state.giftCards.filter(
          (id) => id !== action.payload.id
        );
      } else if (action.payload.type === "add" && action.payload.id) {
        state.giftCards = Array.from(
          new Set([...state.giftCards, action.payload.id])
        );
      } else if (action.payload.type === "reset") {
        state.giftCards = [];
      }
    },
    setCashBackToSpend(state, action: PayloadAction<number>) {
      state.cashBackToSpend = action.payload;
    },
    setTotalDiscount(state, action: PayloadAction<number>) {
      state.totalDiscount = action.payload;
    },
    setAmountTotalGiftcardsToUse(state, action: PayloadAction<number>) {
      state.amountTotalGiftcardsToUse = action.payload;
    },
    setAmountDiscountPromoCode(state, action: PayloadAction<number>) {
      state.amountDiscountPromoCode = action.payload;
    },
    resetPriceAdjustments(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  applyPromoCode,
  setGiftCard,
  setCashBackToSpend,
  setTotalDiscount,
  setAmountTotalGiftcardsToUse,
  setAmountDiscountPromoCode,
  resetPriceAdjustments,
} = priceAdjustmentsSlice.actions;

export default priceAdjustmentsSlice.reducer;
