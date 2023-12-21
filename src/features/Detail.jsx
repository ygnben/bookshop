import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PrimarySearchAppBar from "../components/PrimarySearchAppBar.jsx";
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

import Loader from "../components/Loader.jsx";

import Counter from "../components/FavButton.jsx";
import Shop from "../components/BuyButton.jsx";
function Detail() {
  const { id } = useParams();

  const [login, setLogin] = useState(localStorage.getItem("token"));

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
        // ("jsonData", jsonData);
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
  return (
    <Box>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      {isLoading ? (
        <loader />
      ) : (
        <>
          <DetailInfo bookInfo={data} login={login} id={id} />
        </>
      )}
    </Box>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function DetailInfo({ bookInfo, login, id }) {
  const [favClick, setFavClick] = useState(false);
  const [shopClick, setShopClick] = useState(false);
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
          <Box sx={{ padding: "10px", display: "flex" }}>
            {login ? (
              <Counter id={id} setClicked={setFavClick} clicked={favClick} />
            ) : null}
            {login ? (
              <Shop id={id} setClicked={setShopClick} clicked={shopClick} />
            ) : null}
          </Box>
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
            </Grid>
            <Grid item></Grid>
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
  );
}

export default Detail;
