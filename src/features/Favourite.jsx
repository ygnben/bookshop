import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectName } from "../redux/shopslice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import VerticalToggleButtons from "./VerticalToggleButtons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import useLikeItem from "../hooks/useLikeItem";
import useDeleteLike from "../hooks/useDeleteLike";

function Favourite() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(localStorage.getItem("token"));
  const [view, setView] = useState("list");

  const [likes, _likesLoading, _error, refetch] = useLikeItem();

  const favName = useSelector(selectName);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const books = localStorage.getItem("items");
  //       let arrbook = books.split(",");
  //       let concatObj = [];
  //       for (let bookName in arrbook) {
  //         let response = await fetch(
  //           `https://www.googleapis.com/books/v1/volumes?q=${arrbook[bookName]}`
  //         );

  //         const jsonData = await response.json();
  //         let filterData = [];

  //         filterData = jsonData.items.filter(
  //           (book) => book.id === arrbook[bookName]
  //         );

  //         concatObj.push(filterData);
  //       }

  //       setData(concatObj);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    setData(likes);
    console.log("🚀 ~ useEffect ~ cart:", likes);

    setLoading(false);
  }, [likes]);

  if (loading) {
    return <Loader />;
  }

  console.log("data", data);

  return (
    <>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Favourite list</Typography>
        <VerticalToggleButtons view={view} setView={setView} />
      </Box>

      <Divider variant="inset" />

      <BookList
        likeItems={data}
        login={login}
        view={view}
        refetch={refetch}
        setData={setData}
      />
    </>
  );
}

function BookList({ likeItems, login, view, refetch, setData }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        // maxWidth: 300,
        width: "100%",
        borderRadius: 1,
        // justifyContent: "center",
      }}
    >
      {likeItems?.likeItems.map((book) => (
        <Book
          key={book.id}
          // itemId={book.id}
          id={book.book.id}
          likeId={book.id}
          title={book.book.title}
          img={book.book.img}
          // desc={book.book.desc}
          // price={item.saleInfo?.listPrice?.amount}
          // curCode={item.saleInfo?.listPrice?.currencyCode}
          // login={login}
          refetch={refetch}
          setData={setData}
          likeItems={likeItems}
        ></Book>
      ))}
    </Box>
  );
}

function Book({
  id,
  title,
  img,
  desc,
  login,
  view,
  price,
  likeId,
  refetch,
  setData,
  likeItems,
}) {
  console.log("🚀 ~ Book ~ likeId:", likeId);
  const [delLikeitem, deleteLikeLoading] = useDeleteLike(likeId);

  const handleDelete = (id) => () => {
    console.log("🚀 ~ handleDelete ~ e:", id);
    // console.log("🚀 ~ handleDelete ~ likeId:", likeId);
    console.log("del", delLikeitem(id));
    // refetch();
    // setData();
    delLikeitem(id);
    // setData(likeItems);
  };

  let list = true;
  if (view === "module") {
    list = false;
  }

  return (
    <>
      {list ? (
        <Card sx={{ display: "flex", width: 400 }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={img}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                ${price || 50}
              </Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
            <HighlightOffIcon onClick={() => delLikeitem(id)} />
          </Box>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 400 }} image={img} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: "40px", overflow: "hidden" }}
            >
              {desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/Detail/${id}`}> Learn More</Link>
          </CardActions>
          <HighlightOffIcon onClick={() => handleDelete(likeId)} />
        </Card>
      )}
    </>
  );
}
export default Favourite;
