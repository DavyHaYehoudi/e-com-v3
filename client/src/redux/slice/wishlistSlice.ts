import { WishlistManagerFrontType } from "@/types/WishlistTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state est un tableau vide de produits
const initialState: WishlistManagerFrontType[] = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Cette action accepte maintenant un tableau de produits de type WishlistManagerFrontType[]
    setWishlist: (state, action: PayloadAction<WishlistManagerFrontType[]>) => {      
      return action.payload; 
    },

    // Toggle un item dans la wishlist (ajouter ou retirer un produit)
    toggleItem: (state, action: PayloadAction<WishlistManagerFrontType>) => {
      const idExists = state.some((item) => item._id === action.payload._id);

      // Si l'item existe, on le retire ; sinon, on l'ajoute
      if (idExists) {
        return state.filter((item) => item._id !== action.payload._id);
      } else {
        return [...state, action.payload];
      }
    },

    // Reset la wishlist (réinitialiser à un tableau vide)
    resetWishlist: () => {
      return initialState;
    },
  },
});

export const { setWishlist, toggleItem, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
