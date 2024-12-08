// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/cartSlice";
import priceAdjustmentsReducer from "../slice/priceAdjustmentsSlice";
import addressesReducer from "../slice/addressesSlice";
import cashbackReducer from "../slice/cashbackSlice";
import wishlistReducer from "../slice/wishlistSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";

// Configuration de persistance
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "wishlist", "addresses", "priceAdjustments"],
  // Optionnel : Vous pouvez ajouter un `keyPrefix` pour éviter les conflits de clés entre différents environnements (par exemple, entre le côté client et le côté serveur)
  keyPrefix: 'e-com-v3:',
};
// Combinez vos reducers, s'il y en a plusieurs
const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  priceAdjustments: priceAdjustmentsReducer,
  cashback: cashbackReducer,
  addresses: addressesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurez le store avec le reducer persistant
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = typeof store.dispatch;
