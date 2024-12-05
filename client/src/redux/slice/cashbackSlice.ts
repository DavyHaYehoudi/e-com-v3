import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CashbackSet {
  type: "cashback_earned" | "cashback_spent";
  amount: number;
}
const initialState = {
  cashback_earned: 0,
  cashback_spent: 0,
  cashback_total: 0,
};

// Cashback slice
const cashbackSlice = createSlice({
  name: "cashback",
  initialState,
  reducers: {
    setCashback: (state, action: PayloadAction<CashbackSet>) => {
      // Ajoute le montant au champ approprié
      state[action.payload.type] = action.payload.amount;

      // Met à jour le total
      state.cashback_total = state.cashback_earned - state.cashback_spent;
    },
    resetCashback(state) {
      state.cashback_earned = 0;
      state.cashback_spent = 0;
      state.cashback_total = 0;
    },
  },
});

// Actions exportées
export const { setCashback, resetCashback } = cashbackSlice.actions;

// Réduire exporté pour le store
export default cashbackSlice.reducer;
