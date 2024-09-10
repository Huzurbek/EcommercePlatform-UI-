import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersApi";

export type IUser = {
  id: number;
  name: string;
  email: string;
};

type IUserState = {
  users: IUser[];
  isLoading: boolean;
  error: string;
};

const initialState: IUserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.users = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
