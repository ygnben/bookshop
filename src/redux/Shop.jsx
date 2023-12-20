import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useSelector, useDispatch } from "react-redux";

// import { setShopId } from "./shopSlice";

import { setShopId } from "./counterSlice";

function shop({ id, setClicked, clicked }) {
  const dispatch = useDispatch();
  // dispatch(setCurrentItemID(id));
  // console.log();
  //   const items = useSelector((state) => state.counter);
  //   console.log(items);

  let checkFav = false;
  let items;

  items = localStorage.getItem("shop");
  items = items.split(",");
  checkFav = items.includes(id);

  if (checkFav) {
    setClicked(true);
  }
  function handleShop(id) {
    dispatch(setShopId(id));
    setClicked(true);
  }

  return (
    <div>
      {/* <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button> */}
      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}

      {clicked ? (
        <AddShoppingCartIcon />
      ) : (
        <ShoppingCartIcon onClick={() => handleShop(id)} />
      )}

      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}

      {/* <ShoppingCartIcon /> */}
      {/* <button onClick={() => dispatch(setCurrentItemID(id))}>+</button> */}
    </div>
  );
}

export default shop;
