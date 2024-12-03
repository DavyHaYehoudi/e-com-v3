// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
// import wishlistReducer from "../slice/wishlistSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";

// Configuration de persistance
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "cart",
    "wishlist",
    "addresses",
    "priceAdjustments",
    "cashback",
  ],
};

// Combinez vos reducers, s'il y en a plusieurs
const rootReducer = combineReducers({
  // wishlist: wishlistReducer,
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
