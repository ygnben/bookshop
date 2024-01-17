// Counter.js

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch } from "react-redux";
import { setCurrentItemID, setName } from "../redux/shopslice.jsx";

import useLike from "../hooks/useLike.jsx";

function Counter({ id, name, setClicked, clicked }) {
  const dispatch = useDispatch();
  const [addLike] = useLike();

  let checkFav = false;
  let items;

  items = localStorage.getItem("items");
  items = items.split(",");
  checkFav = items.includes(id);

  if (checkFav) {
    setClicked(true);
  }

  function handleFav(id) {
    addLike({ variables: { bookId: parseInt(id) } });
    dispatch(setCurrentItemID(id));
    setClicked(true);
  }

  return (
    <div>
      {clicked ? (
        <FavoriteIcon />
      ) : (
        <FavoriteBorderIcon onClick={() => handleFav(id, name)} />
      )}
    </div>
  );
}

export default Counter;
