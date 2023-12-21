import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Counter from "../components/Counter.jsx";
import Shop from "../components/Shop.jsx";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import SwipeableTextMobileStepper from "../components/SwipeableTextMobileStepper.jsx";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar.jsx";

import { selectItems, selectShop } from "../redux/counterSlice.jsx";
import { selectName } from "../redux/counterSlice.jsx";

import Loader from "../components/Loader.jsx";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=javascript";

function Book({ id, title, img, desc, price, curCode, login }) {
  const [favClick, setFavClick] = useState(false);
  const [shopClick, setShopClick] = useState(false);
  function handleOnClick(id) {
    console.log(id);
  }
  return (
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
        <Typography>{curCode || "HKD"}</Typography>
        <Typography>{price || 50}</Typography>
      </CardContent>

      <CardActions>
        {login ? (
          <Counter
            id={id}
            title={title}
            setClicked={setFavClick}
            clicked={favClick}
          />
        ) : null}
        {login ? (
          <Shop id={id} setClicked={setShopClick} clicked={shopClick} />
        ) : null}

        <Link to={`/Detail/${id}`}> Learn More</Link>
      </CardActions>
    </Card>
  );
}

function BookList({ books, login }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        width: "100%",
        borderRadius: 1,
        justifyContent: "center",
      }}
    >
      {books?.items.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          img={book.volumeInfo.imageLinks}
          desc={book.volumeInfo.description}
          price={book.saleInfo?.listPrice?.amount}
          curCode={book.saleInfo?.listPrice?.currencyCode}
          login={login}
        ></Book>
      ))}
    </Box>
  );
}

function PictureBar() {
  return <SwipeableTextMobileStepper />;
}

function CategoryBar({ category }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: { sm: "100%" },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="JavaScript" onClick={() => category("javascript")} />
        <Tab label="CSS" onClick={() => category("css")} />
        <Tab label="GraphQL" onClick={() => category("GraphQL")} />
        <Tab label="REACT" onClick={() => category("REACT")} />
        <Tab label="JAVA" onClick={() => category("JAVA")} />
        <Tab label="PYTHON" onClick={() => category("PYTHON")} />
        <Tab label="SQL" onClick={() => category("SQL")} />
      </Tabs>
    </Box>
  );
}

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const items = useSelector(selectItems);
  const name = useSelector(selectName);
  const shop = useSelector(selectShop);

  console.log("shop", shop);
  console.log("item", items);
  console.log("name", name);
  useEffect(() => {
    localStorage.setItem("items", items);
    localStorage.setItem("shop", shop);
  }, [items, shop]);

  const [category, setCategory] = useState("javascript");
  const [login, setLogin] = useState(localStorage.getItem("token"));
  console.log("login", login);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${category}`
        );
        const jsonData = await response.json();

        // Update the state with the received data
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  console.log("data", data);
  return (
    <div style={{ width: "100%" }}>
      <PrimarySearchAppBar
        category={setCategory}
        login={login}
        setLogin={setLogin}
      />
      <PictureBar />

      <CategoryBar category={setCategory} />

      <BookList books={data} login={login} />
    </div>
  );
}

export default Home;
