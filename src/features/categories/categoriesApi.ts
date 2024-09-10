import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCategory } from "./categoriesSlice";
import { api } from "../../services/main-service";

export interface FetchCategoriesError {
  message: string;
}

export const fetchCategories = createAsyncThunk<
  TCategory[],
  void,
  { rejectValue: FetchCategoriesError }
>("category/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await api.get<{ data: TCategory[] }>("/category");
    return response.data.data as TCategory[];
  } catch (e) {
    return thunkAPI.rejectWithValue({ message: "Failed to fetch categories" });
  }
});

export const fetchNestedSubcategoriesById = createAsyncThunk<
  TCategory[],
  number,
  { rejectValue: FetchCategoriesError }
>("category/fetchAllSubcategoryChildren", async (categoryId, thunkAPI) => {
  try {
    const { data } = await api.get<{ data: TCategory[] }>(
      `/category/${categoryId}/last-layer`
    );
    console.log("fetch ishladi : ", data.data);
    return data.data as TCategory[];
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: "Failed to fetch sub categories",
    });
  }
});
