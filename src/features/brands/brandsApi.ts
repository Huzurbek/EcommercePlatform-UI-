import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TBrand } from "./brandsSlice";
import { api } from "../../services/main-service";

export const fetchBrands = createAsyncThunk<
  TBrand[],
  undefined,
  { rejectValue: string; state: RootState }
>("brand/fetchBrands", async (_, thunkAPI) => {
  try {
    const response = await api.get<{ data: TBrand[] }>(`brand`);
    return response.data.data as TBrand[];
  } catch (e) {
    return thunkAPI.rejectWithValue("some brand error");
  }
});
