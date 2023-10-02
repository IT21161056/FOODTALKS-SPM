import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Snackbar from "@mui/material/Snackbar";
import Avatar from "@mui/material/Avatar";
import { Alert, Box, Container, Grid, TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { alanAtom, command, data, user } from "../atom/alanAtom";
import axios from "axios";

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

export default function Login() {
  const navigate = useNavigate();
  const pageName = useLocation();
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [userData, setUserData] = useAtom(user);
  const [newData, setData] = useAtom(data);

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    pass: "",
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setState((prv) => {
      return {
        ...prv,
        open: true,
      };
    });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function login(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8072/users/login", loginCredentials)
      .then((res) => {
        setLoginCredentials({
          email: "",
          pass: "",
        });

        setUserData(res.data.user);
        sessionStorage.setItem("userID", JSON.stringify(res.data.user._id));
        navigate("/menu");

        // handleClick();
        //
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  const handleSubmit = () => {
    axios
      .post("http://localhost:8072/users/login", loginCredentials)
      .then((res) => {
        console.log(res.data.userID);
        sessionStorage.setItem("userID", JSON.stringify(res.data.userID));
        setLoginCredentials({
          email: "",
          pass: "",
        });
        handleClick();
        setTimeout(() => navigate("/menu"), 2000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    try {
      if (newCommand === "loginEmail") {
        setLoginCredentials((prv) => {
          return { ...prv, email: newCommand };
        });
      }
      if (newCommand === "loginPassword") {
        setLoginCredentials((prv) => {
          return { ...prv, pass: newCommand };
        });
      }
      if (newCommand === "userlogin") {
        handleSubmit();
      }
    } finally {
      setCommand("");
    }
  }, [newCommand]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Loggin Successfully!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            // height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 11, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginCredentials.email}
              onChange={(e) =>
                setLoginCredentials((p) => {
                  return {
                    ...p,
                    email: e.target.value,
                  };
                })
              }
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
              value={loginCredentials.pass}
              onChange={(e) =>
                setLoginCredentials((p) => {
                  return {
                    ...p,
                    pass: e.target.value,
                  };
                })
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
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
