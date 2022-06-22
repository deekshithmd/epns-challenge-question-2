import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  filteredProducts: [],
  categoryList: [],
  ratingList: [1, 2, 3, 4, 4.5],
  selectedCategories: [],
  priceFilterValue: 2000,
  selectedRating: 0,
  loading: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectedValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categoryList = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    removeFilter: (state, action) => {
      state.selectedCategories = state.selectedCategories.filter(
        (item) => item !== action.payload
      );
    },
    addFilter: (state, action) => {
      state.selectedCategories = [...state.selectedCategories, action.payload];
    },
    clearFilters: (state) => {
      state.filteredProducts = [...state.products];
      state.selectedCategories = [];
      state.selectedRating = 0;
      state.priceFilterValue = 2000;
    },
    setPriceFilterValue: (state, action) => {
      state.priceFilterValue = action.payload;
    },
    setRating: (state, action) => {
      state.selectedRating = action.payload;
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
  setFilteredProducts,
  addFilter,
  removeFilter,
  setPriceFilterValue,
  setRating,
  clearFilters,
  setCategories,
} = productSlice.actions;

export default productSlice.reducer;
