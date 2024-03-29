import * as React from "react";

import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Typography from "@mui/material/Typography";

import { setShopNull } from "../redux/shopslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useGetCartItem.jsx";

// import { useQuery, useApolloClient } from "@apollo/client";

import { gql, useMutation, useQuery, useApolloClient } from "@apollo/client";

const DELETE_CART = gql`
  mutation Mutation {
    deleteAll
  }
`;

const GET_CART = gql`
  query CartItems {
    cartItems {
      book {
        createdAt
        desc
        id
        img
        title
        updatedAt
      }
      id
    }
  }
`;

export default function Checkout({ state, setState, total, books }) {
  console.log("🚀 ~ Checkout ~ books:", books);
  const [cart, cartLoading] = useCart();

  const [deleteCart] = useMutation(DELETE_CART, {
    refetchQueries: [{ query: GET_CART }],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setState(false);
  };

  const handleCheckOut = () => {
    setState(false);

    Swal.fire({
      title: "Success",
      text: "Thank you",
      icon: "success",
    });

    localStorage.removeItem("shop");
    dispatch(setShopNull());
    deleteCart();
    navigate("/Home");
    // client.resetStore();
  };
  return (
    <>
      <Dialog
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Check out book"}</DialogTitle>
        <DialogContent>
          {books.map((book) => (
            <>
              <Typography>{book.book.title} </Typography>
              <Typography>
                price:{book.saleInfo?.listPrice?.amount || 50}
              </Typography>
            </>
          ))}
          <Typography>Total book:{books.length}</Typography>
          <Typography> Total Price:{books.length * 50}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCheckOut} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
