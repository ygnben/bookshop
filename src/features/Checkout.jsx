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

export default function Checkout({ state, setState, total, books }) {
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

    navigate("/Home");
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
          {books.map((book) =>
            book.map((book) => (
              <>
                <Typography>{book.volumeInfo.title} </Typography>
                <Typography>
                  price:{book.saleInfo?.listPrice?.amount || 50}
                </Typography>
              </>
            ))
          )}
          <Typography>Total book:{books.length}</Typography>
          <Typography> Total Price:{total}</Typography>
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
