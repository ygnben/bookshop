// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItemID: null,
  value: 0,
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCurrentItemID: (state, action) => {
      //   state.currentItemID = action.payload;
      state.items.push(action.payload);
      //   console.log("payload", state.currentItemID);
      //   console.log("items", state.items);
    },

    // selectItems: (state) => state.counter.value,
  },
});

export const { setCurrentItemID } = counterSlice.actions;
export const selectItems = (state) => state.counter.items;

// export const { add } = counterSlice.actions;
// export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
