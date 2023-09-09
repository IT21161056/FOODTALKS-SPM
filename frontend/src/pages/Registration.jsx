import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { resolvePath, useLocation } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import axios from "axios";

const Registraion = () => {
  const pageName = useLocation();
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);

  const [isSubmiting, setIsSubmiting] = useState(false);

  console.log(newAlanAtom);
  // const inputString = "Hello   Wo  rld"; // Example string with multiple spaces

  // Use the replace() method with a regular expression to remove spaces between characters
  // const stringWithoutSpaces = inputString.replace(/\s+/g, "");
  // console.log(stringWithoutSpaces);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (newAlanAtom) {
  //     newAlanAtom.activate();
  //     newAlanAtom.setVisualState({ path: pageName.pathname });
  //   }
  // }, [pageName, newAlanAtom]);

  useEffect(() => {
    if (newCommand === "setFirstName") {
      setUser((prv) => {
        return {
          ...prv,
          firstName: newData,
        };
      });
    }
    if (newCommand === "setLastName") {
      setUser((prv) => {
        return {
          ...prv,
          lastName: newData,
        };
      });
    }
    if (newCommand === "setEmail") {
      setUser((prv) => {
        return {
          ...prv,
          email: newData.toLowerCase(),
        };
      });
    }
    if (newCommand === "setPassword") {
      setUser((prv) => {
        return {
          ...prv,
          password: newData.replace(/\s+/g, ""),
        };
      });
    }
  }, [newCommand]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log({
    //   firstname: data.get("firstName"),
    //   lastName: data.get("lastName"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    setIsSubmiting(true);

    axios
      .post("http://localhost:8072/users", user)
      .then((res) => {
        alert(res.data.message);
        setIsSubmiting(false);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          phone: 0,
          password: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {newAlanAtom == null ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            //   marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //   background: "lightBlue",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  size="small"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        firstName: e.target.value,
                      };
                    })
                  }
                  value={user.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        lastName: e.target.value,
                      };
                    })
                  }
                  value={user.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        email: e.target.value,
                      };
                    })
                  }
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  size="small"
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        phone: e.target.value,
                      };
                    })
                  }
                  value={user.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        password: e.target.value,
                      };
                    })
                  }
                  value={user.password}
                />
              </Grid>
            </Grid>
            {/* <Grid container justifyContent="center">
              <Grid item> */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }} //margin top(mt) margin bottom (mb)
              disabled={isSubmiting}
            >
              {isSubmiting ? <CircularProgress size={30} /> : "Sign Up"}
            </Button>
            {/* </Grid>
            </Grid> */}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Registraion;
