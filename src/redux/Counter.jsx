// Counter.js
import React, { useEffect } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./counterSlice";
import { setCurrentItemID, setName } from "./counterSlice";
import { selectClicked } from "./counterSlice.jsx";

// import { add } from "./counterSlice";

function Counter({ id, name, setClicked, clicked }) {
  // const count = useSelector((state) => state.counter);
  // const clicked = useSelector(selectClicked);
  const dispatch = useDispatch();
  // dispatch(setCurrentItemID(id));
  // console.log();
  //   const items = useSelector((state) => state.counter);
  //   console.log(items);
  let checkFav = false;
  let items;

  items = localStorage.getItem("items");
  items = items.split(",");
  checkFav = items.includes(id);

  if (checkFav) {
    setClicked(true);
  }
  console.log("id", id);
  console.log("items", items);
  console.log("effect1333", checkFav);

  // useEffect(() => {
  //   items = localStorage.getItem("items");
  //   items = items.split(",");
  //   checkFav = items.includes(id);
  //   console.log("id", id);
  //   console.log("items", items);
  //   console.log("effect1333", checkFav);
  // }, [clicked]);
  // console.log(clicked);
  function handleFav(id, name) {
    dispatch(setCurrentItemID(id));
    dispatch(setName(name));
    // dispatch(setClicked());
    setClicked(true);
  }
  console.log("clicked123", clicked);
  console.log("checkFav", checkFav);

  return (
    <div>
      {/* <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button> */}
      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}
      {/* {checkFav ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon onClick={() => handleFav(id, name)} />
      )} */}

      {clicked ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon onClick={() => handleFav(id, name)} />
      )}

      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}

      {/* <ShoppingCartIcon /> */}
      {/* <button onClick={() => dispatch(setCurrentItemID(id))}>+</button> */}
    </div>
  );
}

export default Counter;
