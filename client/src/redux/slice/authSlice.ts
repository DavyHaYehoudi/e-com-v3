// src/store/authSlice.ts
import { isTokenExpired } from "@/utils/token";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isVisitor: boolean;
  isTokenExpired: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isVisitor: true,
  isTokenExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isVisitor = false;
      state.isTokenExpired = isTokenExpired(action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isVisitor = true;
      state.isTokenExpired = false;
    },
    checkTokenExpiration: (state) => {
      if (state.token) {
        state.isTokenExpired = isTokenExpired(state.token);
        state.isAuthenticated = !state.isTokenExpired;
        state.isVisitor = state.isTokenExpired;
      }
    },
    setTokenExpired: (state) => {
      state.isTokenExpired = true;
      state.isAuthenticated = false;
      state.isVisitor = true;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout, checkTokenExpiration, setTokenExpired } =
  authSlice.actions;

// Configuration pour persister les données dans le localStorage
const persistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "token",
    "user",
    "isAuthenticated",
    "isVisitor",
    "isTokenExpired",
  ],
};

export default persistReducer(persistConfig, authSlice.reducer);
