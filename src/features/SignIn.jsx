import * as React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import jwt from "jsonwebtoken";
import * as jose from "jose";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const account = {
    name: "ben",
    password: "123",
  };
  // const getToken = async () => {
  //   const secret = new TextEncoder().encode(
  //     "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  //   );
  //   const alg = "HS256";

  //   const jwt = await new jose.SignJWT({ "urn:example:claim": true })
  //     .setProtectedHeader({ alg })
  //     .setIssuedAt()
  //     .setIssuer("urn:example:issuer")
  //     .setAudience("urn:example:audience")
  //     .setExpirationTime("2h")
  //     .sign(secret);

  //   console.log(jwt);
  // };
  // getToken();

  createJsonWebToken(
    "the issuer",
    account.name,
    import.meta.env.VITE_TOKEN_SECRET
  ).then((token) => {
    localStorage.setItem("jwtToken", token);
  });

  async function createJsonWebToken(iss, sub, secret) {
    const header = {
      alg: "HS256", // Token generation algorithm
      typ: "JWT",
    };

    const payload = {
      iss: iss,
      sub: sub,
      exp: Math.round(Date.now() / 1000) + 60, // token is valid for 60 seconds
    };

    return await new jose.SignJWT(payload)
      .setProtectedHeader(header)
      .sign(new TextEncoder().encode(secret));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      account.name === data.get("email") &&
      account.password === data.get("password")
    ) {
      console.log("pass");

      // const token = jwt.sign(account.name, import.meta.env.VITE_TOKEN_SECRET, {
      //   expiresIn: "1800s",
      // });

      navigate("/Home");
    }
    // if (
    //   Object.values(account).includes(data.get("email")) &
    //   Object.values(account).includes(+data.get("password"))
    // ) {
    //   console.log("pass");
    // }

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
