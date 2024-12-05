// src/store/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistResponse } from "@/app/(public)/types/WishlistTypes";
import { MasterProductsType } from "@/app/(public)/types/ProductTypes";

// État initial typé selon WishlistResponse
const initialState: WishlistResponse = {
  wishlist: undefined,
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistResponse>) => {
      return {
        ...state,
        wishlist: action.payload.wishlist,
        items: action.payload.items,
      };
    },

    toggleItem: (state, action: PayloadAction<MasterProductsType>) => {
      const itemExists = state.items.some(
        (item) => item.id === action.payload.id
      );

      // Si l'item existe, le supprimer ; sinon, l'ajouter
      state.items = itemExists
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [...state.items, action.payload];
    },
    resetWishlist: (state) => {
      state.wishlist = initialState.wishlist;
      state.items = initialState.items;
    },
  },
});

export const { setWishlist, toggleItem, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
