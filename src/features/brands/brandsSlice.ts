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
  selectedBrandIds: number[];
};

const initialState: TBrandState = {
  brands: [],
  isLoading: false,
  error: "",
  selectedBrandIds: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setSelectedBrandIds: (state, action: PayloadAction<number>) => {
      const index = state.selectedBrandIds.indexOf(action.payload);
      if (index !== -1) {
        state.selectedBrandIds.splice(index, 1);
      } else {
        state.selectedBrandIds.push(action.payload);
      }
    },
  },
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
export const { setSelectedBrandIds } = brandSlice.actions;
export default brandSlice.reducer;
