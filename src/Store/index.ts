import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../Features/productsSlice';
import cartReducer from "../Features/cartSlice";
import authReducer from "../Features/authSlice";

export const store = configureStore({
reducer: {
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
}

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
