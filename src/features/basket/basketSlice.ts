import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBaskets } from "./basketApi";

export type TDevice = {
  id: number;
  name: string;
  price: number;
};

export type TBasket = {
  id: number;
  deviceId: number;
  count: number;
  device: TDevice;
};

type TBasketState = {
  baskets: TBasket[];
  isLoading: boolean;
  error: string;
};
const initialState: TBasketState = {
  baskets: [],
  isLoading: false,
  error: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaskets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBaskets.fulfilled,
        (state, action: PayloadAction<{ count: number; rows: TBasket[] }>) => {
          const response = action.payload.rows;
          const buffer: Record<string | number, TBasket> = {};
          response.forEach((el) => {
            if (buffer[el.deviceId]) {
              buffer[el.deviceId] = {
                id: el.id,
                deviceId: el.deviceId,
                count: buffer[el.deviceId].count + 1,
                device: el.device,
              };
            } else {
              buffer[el.deviceId] = {
                id: el.id,
                deviceId: el.deviceId,
                count: 1,
                device: el.device,
              };
            }
          });
          state.baskets = Object.values(buffer);
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(fetchBaskets.rejected, (state) => {
        state.isLoading = false;
        state.error = "some error related on basket";
      });
  },
});

export default basketSlice.reducer;
