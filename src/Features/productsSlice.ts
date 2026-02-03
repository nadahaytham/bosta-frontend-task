import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../Types/products";
import { getProducts } from "../Api/productend";

//Products state structure
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

//Fetch all the products using the API
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
      // Fetch pending
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      // Fetch success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Fetch failed
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
