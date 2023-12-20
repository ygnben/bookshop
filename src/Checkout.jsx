import * as React from "react";

import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

export default function Checkout({ state, setState, total, books }) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const navigate = useNavigate();
  console.log("books1111", books);
  const handleClose = () => {
    setState(false);

    Swal.fire({
      title: "Success",
      text: "Thank you",
      icon: "success",
    });

    localStorage.removeItem("shop");
    navigate("/Home");
  };
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
      Open alert dialog
    </Button> */}
      <Dialog
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Check out book"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
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
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
