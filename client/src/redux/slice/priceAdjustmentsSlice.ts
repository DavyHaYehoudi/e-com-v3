// store/priceAdjustmentsSlice.ts

import { GiftcardToUseFrontType } from "@/types/giftcard/GiftcardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Promocode {
  code: string;
  percentage: number;
  amountDeducted: number;
}

interface PriceAdjustmentsState {
  promocode: Promocode;
  giftcards: GiftcardToUseFrontType[];
  cashBackToSpend: number | null;
  totalDiscount: number;
  amountTotalGiftcardsToUse: number;
}

const initialState: PriceAdjustmentsState = {
  promocode: { code: "", percentage: 0, amountDeducted: 0 },
  giftcards: [],
  cashBackToSpend: 0,
  totalDiscount: 0,
  amountTotalGiftcardsToUse: 0,
};

const priceAdjustmentsSlice = createSlice({
  name: "priceAdjustments",
  initialState,
  reducers: {
    setPromocode(state, action: PayloadAction<Partial<Promocode>>) {
      state.promocode = {
        ...state.promocode,
        ...action.payload,
      };
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
    resetPriceAdjustments(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPromocode,
  setGiftCard,
  setCashBackToSpend,
  setTotalDiscount,
  setAmountTotalGiftcardsToUse,
  resetPriceAdjustments,
} = priceAdjustmentsSlice.actions;

export default priceAdjustmentsSlice.reducer;
