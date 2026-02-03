import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../Types/products";
import {CartState } from "../Types/cart";

//Cart state structure
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add product to cart
     * If product already exists, increase quantity
     */
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    //Remove product completely from cart
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    
    //Update quantity of a cart item
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
