import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useDispatch } from "react-redux";

// import { setShopId } from "./shopSlice";

import { setShopId } from "../redux/shopslice";
import { Box } from "@mui/material";

import useAddCart from "../hooks/useAddBooks";

function shop({ id, setClicked, clicked }) {
  const dispatch = useDispatch();

  const [addCart] = useAddCart();

  let checkFav = false;
  let items;

  items = localStorage.getItem("shop");
  items = items.split(",");
  checkFav = items.includes(id);

  if (checkFav) {
    setClicked(true);
  }
  function handleShop(id) {
    addCart({ variables: { bookId: parseInt(id), qty: 1 } });
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
