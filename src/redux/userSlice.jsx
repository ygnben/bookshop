import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      //   state.items.push(action.payload);
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
