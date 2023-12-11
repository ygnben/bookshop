import React, { useState } from "react";

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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import PrimarySearchAppBar from "./PrimarySearchAppBar";

function Book({ title }) {
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
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

function BookList() {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          // maxWidth: 300,
          borderRadius: 1,
        }}
      >
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
        <Book title="a"></Book>
        <Book title="a"></Book>
      </Box>
    </div>
  );

  // <Book title="a"></Book>;
}

function SearchBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function PictureBar() {
  return <SwipeableTextMobileStepper />;
}

function CategoryBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}

function Home() {
  return (
    <div style={{ width: "100%" }}>
      {/* <SearchBar /> */}
      <PrimarySearchAppBar />
      <PictureBar />
      <CategoryBar />
      <BookList />
    </div>
  );
}

export default Home;
