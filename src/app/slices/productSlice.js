import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  filteredProducts: [],
  categoryNames:[],
  loading: false,
  categories: [],
  priceValue: 2000,
  rating: 0,
  ratings: [1, 2, 3, 4, 4.5],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      return response.data.products;
    } catch (e) {
      return thunkAPI.rejectedValue(e);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories:(state,action)=>{
        state.categoryNames=action.payload
    },
    filtered: (state, action) => {
      state.filteredProducts = action.payload;
    },
    removeFilter: (state, action) => {
      state.categories = state.categories.filter((item) => item !== action.payload);
    },
    resetFilters: (state) => {
      state.filteredProducts = [...state.products];
      state.categories = [];
      state.rating=0;
      state.priceValue=2000;
    },
    setFilter: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setPriceValue: (state, action) => {
      state.priceValue = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  filtered,
  setFilter,
  setPriceValue,
  setRating,
  removeFilter,
  resetFilters,
  setCategories
} = productSlice.actions;

export default productSlice.reducer;
