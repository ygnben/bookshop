// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./shopslice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
