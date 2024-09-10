import { createAsyncThunk } from "@reduxjs/toolkit";
import { TType } from "./typesSlice";
import { RootState } from "../../store";

export const fetchTypes = createAsyncThunk<
  TType[],
  undefined,
  { rejectValue: string; state: RootState }
>("type/fetchTypes", async (_, thunkAPI) => {
  try {
    const response = await fetch(`type`);
    return (await response.json()) as TType[];
  } catch (e) {
    return thunkAPI.rejectWithValue("some error depen on type");
  }
});
