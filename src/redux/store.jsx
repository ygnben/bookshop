// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
// import shopReducer from "./shopSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    // shop: shopReducer,
  },
});
