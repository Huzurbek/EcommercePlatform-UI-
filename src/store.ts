import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice";
import productReducer from "./features/products/productsSlice";
import brandReducer from "./features/brands/brandsSlice";
import typeReducer from "./features/type/typesSlice";
import basketReducer from "./features/basket/basketSlice";
import categoryReducer from "./features/categories/categoriesSlice";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  brandReducer,
  typeReducer,
  basketReducer,
  categoryReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// export type ThunkApiConfig = {
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: AnyErrorType;
//   extra: AnyExtraArgumentType;
// };
