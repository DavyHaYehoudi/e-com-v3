import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CashbackSet {
  type: "cashbackEarned" | "cashbackSpent";
  amount: number;
}
const initialState = {
  cashbackEarned: 0,
  cashbackSpent: 0,
  cashbackTotal: 0,
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
      state.cashbackTotal = state.cashbackEarned - state.cashbackSpent;
    },
    resetCashback(state) {
      state.cashbackEarned = 0;
      state.cashbackSpent = 0;
      state.cashbackTotal = 0;
    },
  },
});

// Actions exportées
export const { setCashback, resetCashback } = cashbackSlice.actions;

// Réduire exporté pour le store
export default cashbackSlice.reducer;
