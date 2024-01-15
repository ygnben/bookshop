import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/shopslice.jsx";
import { selectName } from "../redux/shopslice.jsx";

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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Loader from "../components/Loader.jsx";

import Checkout from "./Checkout.jsx";
import { Link } from "react-router-dom";

import PrimarySearchAppBar from "../components/PrimarySearchAppBar.jsx";

import useCart from "../hooks/useGetCartItem.jsx";
import useDelCart from "../hooks/useDeleteCart.jsx";

function Shopcart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(localStorage.getItem("token"));

  const [open, setOpen] = React.useState(false);

  const [cart, cartLoading] = useCart();
  const [delCart, delCartLoading] = useDelCart();

  console.log("🚀 ~ Shopcart ~ cart:", cart);
  const handleClickOpen = () => {
    setOpen(true);
    "open", open;
  };

  const favName = useSelector(selectName);
  //   (items[0]);
  useEffect(() => {
    setData(cart);
    console.log("🚀 ~ useEffect ~ cart:", cart);

    setLoading(false);
  }, [cart]);
  // useEffect(() => {
  //   // Function to fetch data asynchronously
  //   const fetchData = async () => {
  //     try {
  //       // Perform an asynchronous operation, such as an API call

  //       // const response = await fetch(
  //       //   `https://www.googleapis.com/books/v1/volumes?q=${items[0]}`
  //       // );

  //       const books = localStorage.getItem("shop");
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

  //         //   for (let bookName in arrbook) {
  //         //     filterData = jsonData.items.filter(
  //         //       (book) => book.id === arrbook[bookName]
  //         //     );
  //         //   }

  //         //   concatObj.push(jsonData);
  //         concatObj.push(filterData);
  //       }

  //       setData(concatObj);
  //       // array.push(jsonData);
  //       // ("jsonData", jsonData);
  //       setLoading(false);
  //     } catch (error) {
  //       // Handle any errors that occur during the fetch operation
  //       console.error("Error fetching data:", error);
  //       // setIsLoading(false);
  //     }
  //   };

  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);

  if (loading) {
    return <Loader />;
  }

  // const total = data
  //   .map((book) =>
  //     book.map((book) => {
  //       if (book.saleInfo?.listPrice !== undefined) {
  //         return book.saleInfo?.listPrice?.amount;
  //       } else {
  //         return 50;
  //       }
  //     })
  //   )
  //   .reduce((accumulator, currentValue) => {
  //     return parseInt(accumulator) + parseInt(currentValue);
  //   });

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
          {/* Total:{total} */}
        </Typography>
        <Button onClick={handleClickOpen} fullWidth>
          Check out
        </Button>
        {/* <Checkout state={open} setState={setOpen} total={total} books={data} /> */}
      </Paper>
    </>
  );
}

function BookList({ books, login }) {
  console.log("🚀 ~ BookList ~ books:", books);
  // books.map((book) => console.log(book));

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
      {books?.map((book) => (
        <Book
          id={book.id}
          title={book.title}
          // img={item.volumeInfo.imageLinks}
          desc={book.desc}
          // price={item.saleInfo?.listPrice?.amount}
          // curCode={item.saleInfo?.listPrice?.currencyCode}
          login={login}
        ></Book>
      ))}
    </Box>
  );

  // books.map((book) => ("book", book));
  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       p: 1,
  //       m: 1,
  //       bgcolor: "background.paper",
  //       width: "100%",
  //       borderRadius: 1,
  //     }}
  //   >
  //     {
  //       <Book
  //         key={id}
  //         id={id}
  //         title={title}
  //         // img={item.volumeInfo.imageLinks}
  //         desc={desc}
  //         // price={item.saleInfo?.listPrice?.amount}
  //         // curCode={item.saleInfo?.listPrice?.currencyCode}
  //         login={login}
  //       ></Book>
  //     }
  //   </Box>
  // );
}

function Book({ id, title, img, desc, price, curCode, login }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", width: 400 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        // image={img.smallThumbnail}
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
      <HighlightOffIcon onClick={delCart(id)} />
    </Card>
  );
}

export default Shopcart;
