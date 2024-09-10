import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsApi";

export enum EFilter {
  brandId = "brandId",
  typeId = "typeId",
}
type TProductItem = {
  id: number;
  SKU: string;
  qtyInStock: number;
  originalPrice: number;
  salePrice: number;
  colorId: number;
  productId: number;
};
export type TProduct = {
  productId: number;
  productName: string;
  productDescription: string;
  careInstructions: string;
  about?: string;
  productImage?: string;
  categoryId: number;
  brandId: number;
  productItems: TProductItem[];
};

type TProductState = {
  products: TProduct[];
  isLoading: boolean;
  error: string;
  filters: { brandId: string; typeId: string };
  pagination: { page: number; limit: number; total: number };
};

const initialState: TProductState = {
  products: [],
  isLoading: false,
  error: "",
  filters: { brandId: "", typeId: "" },
  pagination: { page: 1, limit: 5, total: 0 },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<{ key: EFilter; id: string }>) => {
      state.filters[action.payload.key] = action.payload.id;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<{ count: number; rows: TProduct[] }>) => {
          state.products = action.payload.rows;
          state.pagination["total"] = action.payload.count;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});
export const { addFilter, setPage } = productSlice.actions;

export default productSlice.reducer;
