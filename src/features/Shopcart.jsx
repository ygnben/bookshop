import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/counterSlice.jsx";
import { selectName } from "../redux/counterSlice.jsx";

import { useTheme } from "@mui/material/styles";
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
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";

import HorizontalLinearStepper from "./HorizontalLinearStepper.jsx";

import Loader from "../components/Loader.jsx";

import Checkout from "./Checkout.jsx";
import { Link } from "react-router-dom";

import PrimarySearchAppBar from "../components/PrimarySearchAppBar.jsx";

function Shopcart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(localStorage.getItem("token"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("open", open);
  };

  const favName = useSelector(selectName);

  console.log("favName", favName);

  //   console.log(items[0]);
  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        // Perform an asynchronous operation, such as an API call

        // const response = await fetch(
        //   `https://www.googleapis.com/books/v1/volumes?q=${items[0]}`
        // );

        const books = localStorage.getItem("shop");
        console.log(books);
        let arrbook = books.split(",");
        console.log(arrbook);
        let concatObj = [];
        for (let bookName in arrbook) {
          console.log(bookName);
          let response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${arrbook[bookName]}`
          );
          console.log("bookName", bookName);
          console.log("r", response);
          const jsonData = await response.json();
          let filterData = [];

          filterData = jsonData.items.filter(
            (book) => book.id === arrbook[bookName]
          );

          //   for (let bookName in arrbook) {
          //     filterData = jsonData.items.filter(
          //       (book) => book.id === arrbook[bookName]
          //     );
          //   }
          console.log("kkkk", filterData);
          console.log("j", jsonData);
          //   concatObj.push(jsonData);
          concatObj.push(filterData);
        }

        console.log("concatObj", concatObj);

        setData(concatObj);
        // array.push(jsonData);
        // console.log("jsonData", jsonData);
        setLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  console.log("data111", data);

  if (loading) {
    return <Loader />;
  }

  console.log(
    "xxxx1",
    data.map((book) =>
      book.map((book) => book.saleInfo.listPrice?.amount || 50)
    )
  );

  const total = data
    .map((book) =>
      book.map((book) => {
        if (book.saleInfo?.listPrice !== undefined) {
          return book.saleInfo?.listPrice?.amount;
        } else {
          return 50;
        }
      })
    )
    .reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
    });

  return (
    <>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      <Paper sx={{ padding: "10px" }}>
        <HorizontalLinearStepper />

        <Divider variant="inset" />

        <BookList books={data} login={login} />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Total:{total}
        </Typography>
        <Button onClick={handleClickOpen} fullWidth>
          Check out
        </Button>
        <Checkout state={open} setState={setOpen} total={total} books={data} />
      </Paper>
    </>
  );
}

function BookList({ books, login }) {
  console.log("books", books);
  books.map((book) => console.log("book", book));
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
      }}
    >
      {books?.map((item) =>
        item.map((item) => (
          <Book
            key={item.id}
            id={item.id}
            title={item.volumeInfo.title}
            img={item.volumeInfo.imageLinks}
            desc={item.volumeInfo.description}
            price={item.saleInfo?.listPrice?.amount}
            curCode={item.saleInfo?.listPrice?.currencyCode}
            login={login}
          ></Book>
        ))
      )}
    </Box>
  );
}

function Book({ id, title, img, desc, price, curCode, login }) {
  const theme = useTheme();
  function handleOnClick(id) {
    console.log(id);
  }
  return (
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
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
}

export default Shopcart;
