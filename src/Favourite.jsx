import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "./redux/counterSlice";

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

import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

function Favourite() {
  const [data, setData] = useState([]);
  const items = useSelector(selectItems);
  const [login, setLogin] = useState(localStorage.getItem("token"));
  console.log(items[0]);
  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        // Perform an asynchronous operation, such as an API call

        // const response = await fetch(
        //   `https://www.googleapis.com/books/v1/volumes?q=${items[0]}`
        // );

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=3On-moJDuO0C`
        );

        const jsonData = await response.json();

        // Update the state with the received data
        setData(jsonData);
        console.log("jsonData", jsonData);
        // setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  console.log("Fav", items);
  const books = localStorage.getItem("items");
  let arrbook = books.split(",");
  // const items = useSelector((state) => state);
  // console.log(items);
  // return items?.map((item) => <div>{item}</div>);
  // return <div>{items.payload.counter.value}</div>;
  return (
    <>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      {data.items.volumeInfo}
      {/* <BookList books={data} login={login} /> */}
      {/* {arrbook.map((book) => (
        <div>{book}</div>
      ))} */}
    </>
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
          login={login}
        ></Book>
      ))}
      {/* <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book>
          <Book title="a"></Book> */}
      {/* <Book title={books.title}></Book> */}
    </Box>
  );

  // <Book title="a"></Book>;
}

function Book({ id, title, img, desc, login }) {
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
      </CardContent>
      <Counter id={id} />
      <CardActions>
        {login ? <Button size="small">Add Favourite</Button> : null}
        {/* <Button size="small">Share</Button> */}
        {/* <Button size="small" onClick={() => handleOnClick(id)}>
            Learn More
          </Button> */}
        <Link to={`/Detail/${id}`}> Learn More</Link>
      </CardActions>
    </Card>
  );
}

export default Favourite;
