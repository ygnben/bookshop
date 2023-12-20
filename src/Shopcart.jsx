import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "./redux/counterSlice";
import { selectName } from "./redux/counterSlice";

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
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Checkout from "./Checkout.jsx";
import { Link } from "react-router-dom";

import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

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
        // let i = 0;
        // while (i < 3) {
        //   const response = await fetch(
        //     `https://www.googleapis.com/books/v1/volumes?q=8novEAAAQBAJ`
        //   );

        //   console.log("r", response);
        //   const jsonData = await response.json();
        //   console.log("j", jsonData);
        //   // concatObj += jsonData;
        //   concatObj = { ...concatObj, ...jsonData };
        //   console.log("concatObj", concatObj);
        //   i++;
        // }

        console.log("concatObj", concatObj);
        // const response = await fetch(
        //   `https://www.googleapis.com/books/v1/volumes?q=3On-moJDuO0C`
        // );

        // console.log(response);
        // const jsonData = await response.json();
        // console.log(jsonData);
        // Update the state with the received data
        // setData(jsonData);
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

  // console.log("arrbook", arrbook);

  // const items = useSelector((state) => state);
  // console.log(items);
  // return items?.map((item) => <div>{item}</div>);
  // return <div>{items.payload.counter.value}</div>;
  console.log("data111", data);

  //   console.log("data", data.items[0].volumeInfo);
  if (loading) {
    return <div>Loading...</div>;
  }
  //   console.log("data1", data);
  //   //   data.map((book) => console.log("book1", book.items));
  //   data.map((book) => book.items.map((book) => console.log(book.id)));
  //   // filter ans
  //   console.log(
  //     "bbbb",
  //     data.map((book) => book.items.filter((book) => book.id === "8novEAAAQBAJ"))
  //   );

  //   console.log(
  //     "filterBook1",
  //     data.map((book) => book.items).filter((book) => book.id === "8novEAAAQBAJ")
  //   );
  //   data.map((book) => book.items).map((book) => console.log("book3", book.id));

  //   data.map((book) =>
  //     book
  //       .filter((book) => book.id === "8novEAAAQBAJ")
  //       .map((book) => console.log(book))
  //   );

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
        // book.saleInfo.listPrice?.amount || 50;
      })
    )
    .reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
      // return accumulator + currentValue;
    });

  // data.map((book) =>
  //   book
  //     .map((book) => book.saleInfo.listPrice.amount)
  //     .reduce((accumulator, currentValue) => {
  //       return parseInt(accumulator) + currentValue;
  //     })
  // );
  return (
    <>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h1"
        component="h2"
      >
        Shopping cart
      </Typography>

      {/* {array ? array.map((data) => <>{data.items.volumeInfo.title}</>) : null} */}
      {/* {data.items[0].volumeInfo} */}
      <BookList books={data} login={login} />
      <Typography>Total:{total}</Typography>
      <Button onClick={handleClickOpen}>Check out</Button>
      <Checkout state={open} setState={setOpen} total={total} books={data} />
      {/* {arrbook.map((book) => (
          <div>{book}</div>
        ))} */}
      {/* {loading
          ? null
          : data?.items.map((book) => <div>{book.volumeInfo.title}</div>)} */}
    </>
  );
}

function BookList({ books, login }) {
  // const { loading, error, data } = useQuery(query);
  // console.log(error);
  // console.log(data);
  // getBook(apiUrl);
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
        // maxWidth: 300,
        width: "100%",
        borderRadius: 1,
        justifyContent: "center",
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
            curCode={item.saleInfo?.listPrice?.currencyCode}
            login={login}
          ></Book>
        ))
      )}
    </Box>
  );

  // <Book title="a"></Book>;
}

function Book({ id, title, img, desc, price, curCode, login }) {
  function handleOnClick(id) {
    console.log(id);
  }
  return (
    // <div>
    //   <img src="" alt="" />
    //   <div>title:{title}</div>
    //   <div>Author:</div>
    //   <div>price</div>
    //   <div>Detail:</div>
    //   <button>faourite</button>
    //   <button>Buy</button>
    // </div>

    // <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
    //   <Box sx={{ my: 3, mx: 2 }}>
    //     <Grid container alignItems="center">
    //       <Grid item xs>
    //         <Typography gutterBottom variant="h4" component="div">
    //           Toothbrush
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //         <Typography gutterBottom variant="h6" component="div">
    //           $4.50
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //     <Typography color="text.secondary" variant="body2">
    //       Pinstriped cornflower blue cotton blouse takes you on a walk to the
    //       park or just down the hall.
    //     </Typography>
    //   </Box>
    //   <Divider variant="middle" />
    //   <Box sx={{ m: 2 }}>
    //     <Typography gutterBottom variant="body1">
    //       Select type
    //     </Typography>
    //     <Stack direction="row" spacing={1}>
    //       <Chip label="Extra Soft" />
    //       <Chip color="primary" label="Soft" />
    //       <Chip label="Medium" />
    //       <Chip label="Hard" />
    //     </Stack>
    //   </Box>
    //   <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
    //     <Button>Add to cart</Button>
    //   </Box>
    // </Box>

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
      {/* <Counter id={id} /> */}
      <CardActions>
        {/* {login ? <Button size="small">Add Favourite</Button> : null} */}
        {/* <Button size="small">Share</Button> */}
        {/* <Button size="small" onClick={() => handleOnClick(id)}>
              Learn More
            </Button> */}
        <Link to={`/Detail/${id}`}> Learn More</Link>
        {/* <Link to={"/Home"}> Learn More</Link> */}
      </CardActions>
    </Card>
  );
}

export default Shopcart;
