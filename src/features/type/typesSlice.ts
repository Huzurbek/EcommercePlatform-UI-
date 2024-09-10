import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTypes } from "./typesApi";

export type TType = {
  id: number;
  name: string;
};

type TTypeState = {
  types: TType[];
  isLoading: boolean;
  error: string;
};

const initialState: TTypeState = {
  types: [],
  isLoading: false,
  error: "",
};

export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTypes.fulfilled,
        (state, action: PayloadAction<TType[]>) => {
          state.types = action.payload;
          (state.isLoading = false), (state.error = "");
        }
      )
      .addCase(fetchTypes.rejected, (state) => {
        (state.isLoading = false), (state.error = "some error");
      });
  },
});

export default typeSlice.reducer;
