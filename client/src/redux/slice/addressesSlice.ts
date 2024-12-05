import { Address } from "@/app/(public)/types/AddressTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// État initial du slice avec les adresses `shipping` et `billing` initialement nulles
interface AddressesState {
  shipping: Address | null;
  billing: Address | null;
}

const initialState: AddressesState = {
  shipping: null,
  billing: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    // Action pour définir les adresses `shipping` et `billing` dans le state
    setAddresses(
      state,
      action: PayloadAction<{
        shipping: Address | null;
        billing: Address | null;
      }>
    ) {
      // On assigne les adresses s'ils sont présents dans l'action
      if (action.payload.shipping) {
        state.shipping = action.payload.shipping;
      }
      if (action.payload.billing) {
        state.billing = action.payload.billing;
      }
    },
    resetAddresses(state) {
      state.shipping = initialState.shipping;
      state.billing = initialState.billing;
    },
  },
});

export const { setAddresses, resetAddresses } = addressesSlice.actions;

export default addressesSlice.reducer;
