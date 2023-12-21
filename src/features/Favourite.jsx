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

function Favourite() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(localStorage.getItem("token"));
  const [view, setView] = useState("list");

  const favName = useSelector(selectName);

  "favName", favName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = localStorage.getItem("items");
        books;
        let arrbook = books.split(",");
        arrbook;
        let concatObj = [];
        for (let bookName in arrbook) {
          bookName;
          let response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${arrbook[bookName]}`
          );
          "bookName", bookName;
          "r", response;
          const jsonData = await response.json();
          let filterData = [];

          filterData = jsonData.items.filter(
            (book) => book.id === arrbook[bookName]
          );

          concatObj.push(filterData);
        }

        setData(concatObj);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  "data", data;

  if (loading) {
    return <Loader />;
  }

  "view", view;
  return (
    <>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Favourite list</Typography>
        <VerticalToggleButtons view={view} setView={setView} />
      </Box>

      <Divider variant="inset" />

      <BookList books={data} login={login} view={view} />
    </>
  );
}

function BookList({ books, login, view }) {
  "books", books;
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
      {books?.map((item) =>
        item.map((item) => (
          <Book
            key={item.id}
            id={item.id}
            // title={book.volumeInfo.title}
            title={item.volumeInfo.title}
            img={item.volumeInfo.imageLinks}
            desc={item.volumeInfo.description}
            price={item.saleInfo?.listPrice?.amount}
            login={login}
            view={view}
          ></Book>
        ))
      )}
    </Box>
  );
}

function Book({ id, title, img, desc, login, view, price }) {
  function handleOnClick(id) {
    id;
  }
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
            image={img.smallThumbnail}
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
          </Box>
        </Card>
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 400 }}
            image={img.smallThumbnail}
            title="green iguana"
          />
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
        </Card>
      )}
    </>
  );
}
export default Favourite;
