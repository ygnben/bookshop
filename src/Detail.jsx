import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  ButtonBase,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import parse from "html-react-parser";

function Detail() {
  const { id } = useParams();

  const [login, setLogin] = useState(localStorage.getItem("token"));

  //   const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=javascript";
  // fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)

  //   const [loading, setLoading] = useState(true);
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((response) => {
  //         setData(response);
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(`Error: ${error}`);
  //       });
  //   }, []);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        // Perform an asynchronous operation, such as an API call
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const jsonData = await response.json();

        // Update the state with the received data
        // console.log("jsonData", jsonData);
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
    // return () => {
    //   // Perform any necessary cleanup operations
    //   // For example, cancel ongoing API requests or subscriptions
    // };
  }, []);
  //   console.log("data", data);
  return (
    <div>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      {/* <div>{id}</div> */}
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <DetailInfo bookInfo={data} />
        </>
      )}
    </div>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function DetailInfo({ bookInfo }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: "100%",
        minHeight: "50%",

        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={bookInfo.volumeInfo.imageLinks.thumbnail} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {bookInfo.volumeInfo.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {bookInfo.volumeInfo.subtitle}
              </Typography>

              <Typography variant="body2" gutterBottom>
                {bookInfo.volumeInfo.authors}
              </Typography>

              <Typography variant="body2" gutterBottom>
                {bookInfo.volumeInfo.publisher}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {bookInfo.volumeInfo.publishedDate}
              </Typography>
              <Typography variant="body2" component="div" gutterBottom>
                {parse(bookInfo.volumeInfo.description)}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography> */}
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Buy
              </Typography>

              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Favourite
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {bookInfo.saleInfo.country}
            </Typography>

            <Typography variant="subtitle1" component="div">
              {bookInfo.saleInfo?.listPrice?.amount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>

    // <Box>
    //   <img src={bookInfo.volumeInfo.imageLinks.thumbnail} alt="" />

    //   <Typography>Title:</Typography>
    //   <Typography>{bookInfo.volumeInfo.title}</Typography>
    //   <Typography>Subtitle:</Typography>
    //   <Typography>{bookInfo.volumeInfo.subtitle}</Typography>
    //   <Typography>Authors:</Typography>
    //   <Typography>{bookInfo.volumeInfo.authors}</Typography>
    //   <Typography>Publisher:</Typography>
    //   <Typography>{bookInfo.volumeInfo.publisher}</Typography>
    //   <Typography>publishedDate:</Typography>
    //   <Typography>{bookInfo.volumeInfo.publishedDate}</Typography>
    //   <Typography>description:</Typography>
    //   <Typography variant="body2" color="text.secondary">
    //     {bookInfo.volumeInfo.description}
    //   </Typography>
    //   <Button size="small">Buy</Button>
    //   <Button size="small">Favourite</Button>
    // </Box>
  );
}

export default Detail;
