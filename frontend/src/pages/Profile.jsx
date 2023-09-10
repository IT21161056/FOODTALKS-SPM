import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { resolvePath, useLocation, Link, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import axios from "axios";

export default function Profile() {
  const pageName = useLocation();
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);
  const [editProfile, setEditProfile] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

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

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  function edit() {
    setEditProfile((editProfile) => !editProfile);
    console.log(editProfile);
  }
  let userId;
  useEffect(() => {
    userId = JSON.parse(sessionStorage.getItem("userID"));
    // const user = JSON.parse(sessionStorage.getItem('store'))
    axios
      .get("http://localhost:8072/users/" + userId)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmiting(true);
    const userId = JSON.parse(sessionStorage.getItem("userID"));
    axios
      .put("http://localhost:8072/users/" + userId, user)
      .then((res) => {
        setIsSubmiting(false);
        setEditProfile(false);
        handleClick();
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 1,
      }}
    >
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Updated successfully"
        key={vertical + horizontal}
      /> */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update successfull!
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: "relative",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "#d6d6d6",
          borderRadius: 2,
          padding: 2,
          margin: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 2,
          }}
        >
          <IconButton
            onClick={edit}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <EditIcon color={editProfile ? "disabled" : "primary"} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundPosition: "center",
              backgroundSize: 350,
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyo07m6V4p3fk0VfCjEUDswxKwKmavLe6hqAOW52Mw85BKaNSHFK6FtLLGycXFsxK_7d8&usqp=CAU')",
            }}
          >
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyo07m6V4p3fk0VfCjEUDswxKwKmavLe6hqAOW52Mw85BKaNSHFK6FtLLGycXFsxK_7d8&usqp=CAU" /> */}
          </Box>
        </Box>
        <Divider />
        <Box component="form" d onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!editProfile}
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
                disabled={!editProfile}
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
                disabled={!editProfile}
                required
                fullWidth
                size="small"
                id="address"
                label="Address"
                name="address"
                autoComplete="family-name"
                onChange={(e) =>
                  setUser((p) => {
                    return {
                      ...p,
                      address: e.target.value,
                    };
                  })
                }
                value={user.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!editProfile}
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
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!editProfile}
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
                disabled={!editProfile}
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
            disabled={isSubmiting || !editProfile}
          >
            {isSubmiting ? <CircularProgress size={30} /> : "Save"}
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
    </Container>
  );
}
