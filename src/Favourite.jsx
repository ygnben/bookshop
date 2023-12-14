import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Favourite() {
  const items = useSelector((state) => state.counter);
  console.log("Fav", items);
  // const items = useSelector((state) => state);
  // console.log(items);
  return <div>{items}</div>;
}

export default Favourite;
