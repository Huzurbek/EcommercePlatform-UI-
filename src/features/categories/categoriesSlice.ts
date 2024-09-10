import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCategories,
  FetchCategoriesError,
  fetchNestedSubcategoriesById,
} from "./categoriesApi";

export type TCategory = {
  categoryId: number;
  categoryName: string;
  categoryDescription?: string;
  categoryImage?: string;
  parentCategoryId: number | null;
};

type TCategoryState = {
  categories: TCategory[];
  nestedSubcategories: TCategory[];
  isLoading: boolean;
  error: string;
};

const initialState: TCategoryState = {
  categories: [],
  nestedSubcategories: [],
  isLoading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearNestedSubcategories: (state) => {
      state.nestedSubcategories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<TCategory[]>) => {
          state.categories = action.payload;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<FetchCategoriesError | undefined>) => {
          state.isLoading = false;
          state.error = action.payload
            ? action.payload.message
            : "Failed to fetch categories";
        }
      )
      //Fech all children categories if has:
      .addCase(fetchNestedSubcategoriesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchNestedSubcategoriesById.fulfilled,
        (state, action: PayloadAction<TCategory[]>) => {
          state.nestedSubcategories = action.payload;
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(
        fetchNestedSubcategoriesById.rejected,
        (state, action: PayloadAction<FetchCategoriesError | undefined>) => {
          state.isLoading = false;
          state.error = action.payload
            ? action.payload.message
            : "Failed to fetch nested subcategories";
        }
      );
  },
});

export const { clearNestedSubcategories } = categorySlice.actions;
export default categorySlice.reducer;
