import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "./redux/counterSlice";

function Favourite() {
  const items = useSelector(selectItems);
  console.log("Fav", items);
  // const items = useSelector((state) => state);
  // console.log(items);
  // return items?.map((item) => <div>{item}</div>);
  // return <div>{items.payload.counter.value}</div>;
  return <div>{items}</div>;
}

export default Favourite;
