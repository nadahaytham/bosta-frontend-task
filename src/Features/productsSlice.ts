import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../Api/axios';
import { Product } from "../Types/products";
import { getProducts } from "../Api/productend";
interface ProductsState {
  items: Product[];
  loading: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await getProducts();
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
