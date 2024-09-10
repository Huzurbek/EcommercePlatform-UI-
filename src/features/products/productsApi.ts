import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "./productsSlice";
import { api } from "../../services/main-service";

type TProductsResponse = {
  count: number;
  rows: TProduct[];
};
type TParams = {
  limit: number;
  page: number;
  catIds: string;
  // brandId: string;
  // typeId: string;
};
export interface FetchProductsError {
  message: string;
}
export const fetchProducts = createAsyncThunk<
  TProductsResponse,
  TParams,
  { rejectValue: FetchProductsError }
>("product/fetchProducts", async (params, thunkAPI) => {
  try {
    const response = await api.get<TProductsResponse>(`product`, {
      params: {
        limit: params.limit,
        page: params.page,
        catIds: params.catIds,
      },
    });
    return response.data as TProductsResponse;
  } catch (e) {
    return thunkAPI.rejectWithValue({ message: "Failed to fetch products" });
  }
});
