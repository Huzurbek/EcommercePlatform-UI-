import { createAsyncThunk } from "@reduxjs/toolkit";
import { TBasket } from "./basketSlice";
import { RootState } from "../../store";
import { api } from "../../services/main-service";

export const fetchBaskets = createAsyncThunk<
  { count: number; rows: TBasket[] },
  undefined,
  { rejectValue: string; state: RootState }
>("basket/fetchBaskets", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/basket/backet_device/3`);
    return response.data as { count: number; rows: TBasket[] };
  } catch (e) {
    return thunkAPI.rejectWithValue("some basket error");
  }
});
