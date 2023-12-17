// Counter.js
import React from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./counterSlice";
import { setCurrentItemID } from "./counterSlice";
// import { add } from "./counterSlice";

function Counter({ id }) {
  // const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  // dispatch(setCurrentItemID(id));
  // console.log();
  //   const items = useSelector((state) => state.counter);
  //   console.log(items);

  return (
    <div>
      {/* <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button> */}
      <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} />
      {/* <ShoppingCartIcon /> */}
      {/* <button onClick={() => dispatch(setCurrentItemID(id))}>+</button> */}
    </div>
  );
}

export default Counter;
