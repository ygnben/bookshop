// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
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

      // console.log("payload", state.currentItemID);
      //   console.log("items", state.items);
      // console.log("payloadSetID");
      console.log("itemID", action.payload);
    },
    setName: (state, action) => {
      state.name = action.payload.name;
      // console.log("payloadsetName");
      // console.log("payloadsetName", state.name);
      console.log("setname", action.payload);
    },
    // selectItems: (state) => state.counter.value,
  },
});

export const { setCurrentItemID, setName } = counterSlice.actions;
export const selectItems = (state) => state.counter.items;
export const selectName = (state) => state.counter.name;

// export const { add } = counterSlice.actions;
// export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
