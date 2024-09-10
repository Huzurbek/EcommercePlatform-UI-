import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "./usersSlice";

// export const fetchUsers = createAsyncThunk(
//   "user/fetchAll",
//   async (_, thunkApi) => {
//     try {
//       const response = await fetch("");
//       return response.json();
//     } catch (e) {
//       return thunkApi.rejectWithValue("Не удалось загрузить пользователей");
//     }
//   }
// );

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return (await response.json()) as IUser[];
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);
