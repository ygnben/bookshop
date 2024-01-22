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

//scroll
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";

import parse from "html-react-parser";

import Loader from "../components/Loader.jsx";

import Counter from "../components/FavButton.jsx";
import Shop from "../components/BuyButton.jsx";

import { useQuery, useMutation, gql } from "@apollo/client";

import Comment from "./Comment.jsx";
// import useBooks from "../hooks/useBooks.jsx";

import useBook from "../hooks/useBook.jsx";

const GET_COMMENTS = gql`
  query Comment($bookId: Int!) {
    Comment(bookId: $bookId) {
      content
      createdAt
      id
      userId
    }
  }
`;

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function Detail(props) {
  const { id } = useParams();

  const [login, setLogin] = useState(localStorage.getItem("token"));

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getUniqueBook } = useBook(id);

  // useEffect(() => {
  //   // Function to fetch data asynchronously
  //   const fetchData = async () => {
  //     try {
  //       // Perform an asynchronous operation, such as an API call
  //       const response = await fetch(
  //         `https://www.googleapis.com/books/v1/volumes/${id}`
  //       );
  //       const jsonData = await response.json();

  //       setData(jsonData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const { data, loading, error } = getUniqueBook();
  // setBook(data?.book);
  console.log("data", data);

  // useEffect(() => {
  //   const { data, loading, error } = getUniqueBook();
  //   console.log("🚀 ~ useEffect ~ data:", data);
  //   // console.log(data);
  //   // console.log("🚀 ~ useEffect ~ data:", data?.book);
  //   setData(data?.book);
  //   // if (loading) {
  //   //   // Handle loading state
  //   //   setIsLoading(false);
  //   // }
  //   // if (error) {
  //   //   // Handle error state
  //   // }
  //   // if (data) {
  //   //   // Do something with the fetched books
  //   //   setData(data?.book);
  //   // }
  // }, [data]);
  return (
    <Box>
      <PrimarySearchAppBar login={login} setLogin={setLogin} />
      {isLoading ? (
        <loader />
      ) : (
        <>
          <span id="back-to-top-anchor" />
          <DetailInfo bookInfo={data} login={login} id={id} />
          <Comment bookId={id} />
          <ScrollTop {...props}>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
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
    <>
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
              <Img alt="complex" src={bookInfo?.img} />
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
                  {bookInfo?.title}
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  {bookInfo?.desc}
                  {/* {parse(bookInfo?.desc)} */}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {/* {bookInfo.saleInfo.country} */}
              </Typography>

              <Typography variant="subtitle1" component="div">
                {/* {bookInfo.saleInfo?.listPrice?.amount} */}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Detail;
