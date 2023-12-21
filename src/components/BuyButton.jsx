import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useDispatch } from "react-redux";

// import { setShopId } from "./shopSlice";

import { setShopId } from "../redux/shopslice";
import { Box } from "@mui/material";

function shop({ id, setClicked, clicked }) {
  const dispatch = useDispatch();

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
    <Box>
      {clicked ? (
        <AddShoppingCartIcon />
      ) : (
        <ShoppingCartIcon onClick={() => handleShop(id)} />
      )}

      {/* <FavoriteBorderIcon onClick={() => dispatch(setCurrentItemID(id))} /> */}

      {/* <ShoppingCartIcon /> */}
      {/* <button onClick={() => dispatch(setCurrentItemID(id))}>+</button> */}
    </Box>
  );
}

export default shop;
