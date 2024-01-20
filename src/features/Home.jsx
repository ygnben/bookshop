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

import Counter from "../components/FavButton.jsx";
import Shop from "../components/BuyButton.jsx";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import SwipeableTextMobileStepper from "../components/SwipeableTextMobileStepper.jsx";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar.jsx";

import { selectItems, selectShop } from "../redux/shopslice.jsx";
import { selectName } from "../redux/shopslice.jsx";

import { useLazyQuery } from "@apollo/client";

import useBooks from "../hooks/useBooks.jsx";
import useSearchBook from "../hooks/useSearchBook.jsx";

// import { useBooks } from "../hooks/useBooks.jsx";

import Loader from "../components/Loader.jsx";
// import useSearchBook from "../hooks/useSearchBook.jsx";
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=javascript";

function Book({ id, title, img, desc, price, curCode, login }) {
  const [favClick, setFavClick] = useState(false);
  const [shopClick, setShopClick] = useState(false);

  return (
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
      {books?.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          title={book.title}
          img={book.img}
          desc={book.desc}
          price={book.price}
          // curCode={book.saleInfo?.listPrice?.currencyCode}
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
  // const [data, setData] = useState([]);
  const [stateBooks, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [login, setLogin] = useState(localStorage.getItem("token"));
  // const { getAllBooks, getUniqueBook } = useBooks();

  const items = useSelector(selectItems);
  const name = useSelector(selectName);
  const shop = useSelector(selectShop);

  // const { allBooksData, allBooksLoading, allBooksError } = useBooks();

  const [books, loading, error] = useBooks();

  console.log("books1", books);
  // const { getSearchBook, searchLoading, searchError, searchData } =
  //   useSearchBook();

  const { getSearchBook, searchData } = useSearchBook();

  console.log("searchData1234", searchData);

  // console.log("allBooksData1", allBooksData);
  // console.log("allBooksLoading1", allBooksLoading);
  useEffect(() => {
    localStorage.setItem("items", items);
    localStorage.setItem("shop", shop);
  }, [items, shop]);

  // const { searchBook } = useSearchBook("java");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://www.googleapis.com/books/v1/volumes?q=${category}`
  //       );
  //       const jsonData = await response.json();

  //       // Update the state with the received data
  //       setData(jsonData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();

  //   return () => {};
  // }, [category]);

  useEffect(() => {
    console.log("🚀 ~ category", searchName);
    if (searchName) {
      // get(category);
      console.log("searchname");
      // const { data, loading, error } = searchBook(searchName);
      // const {searchBook,searchBookData,searchBookLoading,searchBookError} = useSearchBook(searchName);
      // searchBook
      // console.log("🚀 ~ useEffect ~ data:", data);
      // const { data, loading, error } = getAllBooks();
      getSearchBook({
        variables: {
          title: searchName,
        },
      }).then((res) => setBooks(res.data.searchBooks));

      console.log("searchDatasearchDatasearchData", searchData);

      // console.log("🚀 ~ useEffect ~ data:", data);
      // Handle loading state
      // setIsLoading(searchLoading);

      // console.log("searchData", searchData1);
      // if (searchError) {
      //   // Handle error state
      // }
      // if (searchData) {
      //   // Do something with the fetched books
      //   // setBooks(searchData);
      // }
    } else {
      //   console.log("all data");
      //   // console.log("all dataallBooksData allBooksData", allBooksData);
      //   console.log("allBooksData allBooksData", books);

      //   // setIsLoading(allBooksLoading);

      //   // if (allBooksError) {
      //   //   // Handle error state
      //   // }
      //   // setBooks(allBooksData);
      //   // if (allBooksData) {
      //   //   // Do something with the fetched books
      setBooks(books);
      //   // }
    }
    // console.log("🚀 ~ useEffect ~ data:", data);
  }, [searchName]);

  console.log(stateBooks);
  // useEffect(() => {
  //   if (typeof category === "string") {
  //     // get(category);
  //     const { data, loading, error } = getAllBooks();
  //     if (loading) {
  //       // Handle loading state
  //       setIsLoading(false);
  //     }
  //     if (error) {
  //       // Handle error state
  //     }
  //     if (data) {
  //       // Do something with the fetched books
  //       setData(data);
  //     }
  //   } else {
  //     const { data, loading, error } = getAllBooks();
  //     if (loading) {
  //       // Handle loading state
  //       setIsLoading(false);
  //     }
  //     if (error) {
  //       // Handle error state
  //     }
  //     if (data) {
  //       // Do something with the fetched books
  //       setData(data);
  //     }
  //   }
  //   console.log("🚀 ~ useEffect ~ data:", data);
  // }, [getAllBooks]);

  if (isLoading) {
    return <Loader />;
  }

  // if (!books) {
  //   return <div>No data available.</div>;
  // }
  return (
    <div style={{ width: "100%" }}>
      <PrimarySearchAppBar
        setSearchName={setSearchName}
        login={login}
        setLogin={setLogin}
      />
      <PictureBar />
      <CategoryBar category={setSearchName} />
      {/* <BookList books={data} login={login} /> */}
      <BookList books={stateBooks || books} login={login} />
    </div>
  );
}

export default Home;
