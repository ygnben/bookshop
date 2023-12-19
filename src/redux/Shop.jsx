import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector, useDispatch } from "react-redux";

// import { setShopId } from "./shopSlice";

import { setShopId } from "./counterSlice";

function shop({ id }) {
  const dispatch = useDispatch();
  // dispatch(setCurrentItemID(id));
  // console.log();
  //   const items = useSelector((state) => state.counter);
  //   console.log(items);

  function handleShop(id) {
    dispatch(setShopId(id));
  }

  return (
    <div>
      {/* <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button> */}
      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}
      <ShoppingCartIcon onClick={() => handleShop(id)} />
      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}

      {/* <ShoppingCartIcon /> */}
      {/* <button onClick={() => dispatch(setCurrentItemID(id))}>+</button> */}
    </div>
  );
}

export default shop;
