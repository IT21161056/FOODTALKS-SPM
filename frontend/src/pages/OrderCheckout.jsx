import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function OrderCheckout() {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    let total = window.location.search;
    const urlParams = new URLSearchParams(total);
    const totalAmount = urlParams.get("total");
    setTotalAmount(totalAmount); // Set the total amount in the state
  }, []);

  const past = new Date('2023-01-01').toISOString().split('T')[0];
  const [minDate, setminDate] = useState(past);

  const today = new Date().toISOString().split('T')[0];
  const [maxDate, setMaxDate] = useState(today);

  const navigate = useNavigate();
  const pageName = useLocation();

  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newCommand, setNewCommand] = useAtom(command);
  const [newData, setData] = useAtom(data);

  const [order, setOrder] = useState({
    customerName: "",
    mobileNumber: "",
    city: "",
    deliverLocation: "",
    deliverDate: "",
    totalAmount: totalAmount
  });

  // useEffect(() => {
  //   if (newAlanAtom) {
  //     newAlanAtom.activate();
  //     newAlanAtom.setVisualState({ path: pageName.pathname });
  //   }
  // }, [pageName, newAlanAtom]);

  // console.log(pageName.pathname);

  useEffect(() => {
    if (newCommand === "setCustomerName") {
      setOrder((prv) => {
        return {
          ...prv,
          customerName: newData,
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
    if (newCommand === "setCity") {
      setOrder((prv) => {
        return {
          ...prv,
          city: newData,
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

  // console.log(customerName);
  // console.log(mobileNumber);
  // console.log(city);
  // console.log(deliverLocation);
  // console.log(deliverDate);
  // console.log(totalAmount);

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      mobileNumber: data.get("mobileNumber"),
      city: data.get("city"),
      deliverLocation: data.get("deliverLocation"),
      deliverDate: data.get("deliverDate"),
      totalAmount: data.get("totalAmount")
    });
  };

  console.log(order);

  return (
    <form>
      <Box
        display="flex"
        position="absolute"
        top={90}
        left={280}
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
              name="customerName"
              required
              size="small"
              id="customerName"
              label="Name"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    customerName: e.target.value,
                  };
                })
              }
              value={order.customerName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              type={"tel"}
              pattern="[0-9]{10}"
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
              name="city"
              required
              fullWidth
              size="small"
              id="city"
              label="City"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    city: e.target.value,
                  };
                })
              }
              value={order.city}
            />
          </Grid>

          {/* <Grid item xs={12}>
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
          </Grid> */}

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
              min={maxDate} max={maxDate}
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

        <Grid container spacing={0}>
          <Grid sx={{ marginLeft: '50px' }}>
            <Button
              type="button"
              sx={{ margin: 3, borderRadius: 3, width: '200px'}}
              variant="contained"
              color="primary"
              onClick={() => navigate('/cartItem')}
              
            >
              Cancel Order
            </Button>
          </Grid>
          <Grid sx={{ marginLeft: '170px' }}>
            <Button
              type="submit"
              sx={{ margin: 3, borderRadius: 3, width: '200px' }}
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
            >
              Submit Order
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        display="flex"
        position="absolute"
        top={90}
        left={1200}
        flexDirection="column"
        maxWidth={300}
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
        <Typography 
          variant="h5" 
          textAlign="center"
          marginBottom={4}
        >
          Total Amount
        </Typography>

        <Typography>
          RS: {totalAmount}
        </Typography>
      </Box>
    </form>
  );
}
