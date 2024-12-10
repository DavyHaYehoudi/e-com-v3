// store/priceAdjustmentsSlice.ts

import { GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceAdjustmentsState {
  promoCode: string;
  giftcards: GiftcardToUseFrontType[];
  cashBackToSpend: number | null;
  totalDiscount: number;
  amountDiscountPromoCode: number;
  amountTotalGiftcardsToUse: number;
}

const initialState: PriceAdjustmentsState = {
  promoCode: "",
  giftcards: [],
  cashBackToSpend: 0,
  totalDiscount: 0,
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
        _id: string;
        code: string;
        balance: number;
        amountToUse?: number;
        type: "add" | "remove" | "reset";
      }>
    ) {
      if (action.payload.type === "remove") {
        console.log("action.payload:", action.payload);

        state.giftcards = state.giftcards.filter(
          (giftcard) => giftcard._id !== action.payload._id
        );
      } else if (action.payload.type === "add" && action.payload) {
        if (
          !state.giftcards.some(
            (giftcard) => giftcard._id === action.payload._id
          )
        ) {
          state.giftcards = [...state.giftcards, action.payload];
        }
      } else if (action.payload.type === "reset") {
        state.giftcards = [];
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
