// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import shopReducer from "../reducers/shop";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
  },
});
