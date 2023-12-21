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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import Counter from "./redux/Counter.jsx";
import Shop from "./redux/Shop.jsx";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import { func } from "prop-types";

import { selectItems, selectShop } from "./redux/counterSlice.jsx";
import { selectName } from "./redux/counterSlice.jsx";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=javascript";

function getBook(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((bookData) => {
      // Process the retrieved user data
      console.log("Book Data:", bookData);
      return bookData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// const query = gql`
//   query {
//     searchBooks(query: "Harry Potter") {
//       items {
//         id
//         volumeInfo {
//           title
//           authors
//           description
//         }
//       }
//     }
//   }
// `;

// client
//   .query({ query })
//   .then((result) => {
//     console.log(result.data.searchBooks.items);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// function getBook() {
//   const { loading, error, data } = useQuery(query);

//   if (loading) return null;
//   if (error) return `Error ! ${error}`;
// }

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
        // image="/static/images/cards/contemplative-reptile.jpg"
        image={img.smallThumbnail}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        {/* <Typography gutterBottom variant="h5" component="div">
          {bookInfo.saleInfo?.listPrice?.amount}
        </Typography> */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: "40px", overflow: "hidden" }}
        >
          {/* Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica */}
          {desc}
        </Typography>
        <Typography>{curCode || "HKD"}</Typography>
        <Typography>{price || 50}</Typography>
      </CardContent>

      <CardActions>
        {/* {login ? <Button size="small">Add Favourite</Button> : null} */}
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
        {/* <Shop id={id} /> */}
        {/* <Button size="small">Share</Button> */}
        {/* <Button size="small" onClick={() => handleOnClick(id)}>
          Learn More
        </Button> */}
        <Link to={`/Detail/${id}`}> Learn More</Link>
      </CardActions>
    </Card>
  );
}

function BookList({ books, login }) {
  // const { loading, error, data } = useQuery(query);
  // console.log(error);
  // console.log(data);
  // getBook(apiUrl);
  console.log("books", books.items);
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

  // <Book title="a"></Book>;
}

function SearchBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
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

  // const items = useSelector((state) => state);
  // console.log(items);

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
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        // Perform an asynchronous operation, such as an API call
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${category}`
        );
        const jsonData = await response.json();

        // Update the state with the received data
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Clean up function to cancel any pending requests or subscriptions
    return () => {
      // Perform any necessary cleanup operations
      // For example, cancel ongoing API requests or subscriptions
    };
  }, [category]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  console.log("data", data);
  return (
    <div style={{ width: "100%" }}>
      {/* <SearchBar /> */}
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
