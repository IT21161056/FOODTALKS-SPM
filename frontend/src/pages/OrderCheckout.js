import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
// import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
//<a href="https://storyset.com/online">Online illustrations by Storyset</a>

export default function OrderCheckout() {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    var total = window.location.search;
    const urlParams = new URLSearchParams(total);
    const totalAmount = urlParams.get("total");
    setTotalAmount(totalAmount); // Set the total amount in the state
  }, []);

  const navigate = useNavigate();
  const pageName = useLocation();

  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newCommand, setNewCommand] = useAtom(command);
  const [newData, setData] = useAtom(data);

  const [order, setOrder] = useState({
    name: "",
    mobileNumber: "",
    totalAmount: "",
    deliverLocation: "",
    deliverDate: "",
  });

  // useEffect(() => {
  //   if (newAlanAtom) {
  //     newAlanAtom.activate();
  //     newAlanAtom.setVisualState({ path: pageName.pathname });
  //   }
  // }, [pageName, newAlanAtom]);

  // console.log(pageName.pathname);

  useEffect(() => {
    if (newCommand === "setName") {
      setOrder((prv) => {
        return {
          ...prv,
          name: newData,
        };
      });
    }
    if (newCommand === "setMobileNumber") {
      setOrder((prv) => {
        return {
          ...prv,
          mobileNumber: newData,
        };
      });
    }
    if (newCommand === "setDeliverLocation") {
      setOrder((prv) => {
        return {
          ...prv,
          deliverLocation: newData,
        };
      });
    }
    if (newCommand === "setDeliverDate") {
      setOrder((prv) => {
        return {
          ...prv,
          deliverDate: newData,
        };
      });
    }
  }, [newCommand]);

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      mobileNumber: data.get("mobileNumber"),
      totalAmount: data.get("totalAmount"),
      deliverLocation: data.get("deliverLocation"),
      deliverDate: data.get("deliverDate"),
    });
  };

  console.log(order);

  return (
    <form>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={800}
        border={1}
        borderColor={"#1976d2"}
        justifyContent="center"
        alignItems="center"
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center">
          Personal Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              style={{ width: "600px" }}
              autoComplete="given-name"
              name="name"
              required
              size="small"
              id="name"
              label="Name"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    name: e.target.value,
                  };
                })
              }
              value={order.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              type={"tel"}
              variant="outlined"
              style={{ width: "300px" }}
              name="mobileNumber"
              required
              fullWidth
              size="small"
              id="mobileNumber"
              label="Mobile Number"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    mobileNumber: e.target.value,
                  };
                })
              }
              value={order.mobileNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              style={{ width: "300px" }}
              name="totalAmount"
              required
              fullWidth
              size="small"
              id="totalAmount"
              label="Total Amount"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    totalAmount: e.target.value,
                  };
                })
              }
              value={order.totalAmount}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              type={"text"}
              variant="outlined"
              style={{ width: "600px" }}
              name="deliverLocation"
              required
              fullWidth
              size="small"
              id="deliverLocation"
              label="Deliver Location"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    deliverLocation: e.target.value,
                  };
                })
              }
              value={order.deliverLocation}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              type={"date"}
              variant="outlined"
              style={{ width: "300px" }}
              name="deliverDate"
              required
              fullWidth
              size="small"
              id="deliverDate"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    deliverDate: e.target.value,
                  };
                })
              }
              value={order.deliverDate}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{ margin: 3, borderRadius: 3 }}
          variant="contained"
          color="primary"
          onSubmit={handleSubmit}
        >
          Submit Order
        </Button>
      </Box>
    </form>
  );
}
