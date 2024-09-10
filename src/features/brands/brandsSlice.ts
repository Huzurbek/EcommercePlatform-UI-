import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBrands } from "./brandsApi";

export type TBrand = {
  brandId: number;
  brandName: string;
  brandDescription: string;
};
type TBrandState = {
  brands: TBrand[];
  isLoading: boolean;
  error: string;
};

const initialState: TBrandState = {
  brands: [],
  isLoading: false,
  error: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<TBrand[]>) => {
          state.brands = action.payload;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(fetchBrands.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default brandSlice.reducer;
