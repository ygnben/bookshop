import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LoginSocialGoogle } from "reactjs-social-login";

import { GoogleLoginButton } from "react-social-login-buttons";

import * as jose from "jose";
import useLogin from "../hooks/useLogin";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [login, loginLoading, loginError] = useLogin();

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {}, []);
  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const getToHome = (token) => {
    if (token) {
      window.localStorage.setItem("token", token);
      navigate("/home");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = await login({
      variables: { name: data.get("name"), password: data.get("password") },
    });

    if (token) {
      localStorage.setItem("token", token?.data.login?.token);
      navigate("/Home");
    }
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <LoginSocialGoogle
              isOnlyGetToken
              // client_id="297248572097-v24t8i1jbbivtkdr1ef13qn0sid8gbjh.apps.googleusercontent.com"
              client_id={import.meta.env.VITE_APP_GG_APP_ID || ""}
              onLoginStart={onLoginStart}
              onResolve={({ provider, data }) => {
                getToHome(data.access_token);
              }}
              onReject={(err) => {
                err;
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
