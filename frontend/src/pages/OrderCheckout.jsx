import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

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
  const [newCommand, setCommand] = useAtom(command);
  const [newData, setData] = useAtom(data);

  //console.log(newAlanAtom);

  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    mobileNumber: "",
    city: "",
    deliverLocation: "",
    deliverDate: "",
    totalAmount: 500
  });

  console.log(orderDetails);

  useEffect(() => {
    try{
      if (newCommand === "setCustomerName") {
        setOrderDetails((prv) => {
          return {
            ...prv,
            customerName: newData,
          };
        });
      }
      if (newCommand === "setMobileNumber") {
        setOrderDetails((prv) => {
          return {
            ...prv,
            mobileNumber: newData,
          };
        });
      }
      if (newCommand === "setCity") {
        setOrderDetails((prv) => {
          return {
            ...prv,
            city: newData.toLowerCase(),
          };
        });
      }
      if (newCommand === "setDeliverLocation") {
        setOrderDetails((prv) => {
          return {
            ...prv,
            deliverLocation: newData,
          };
        });
      }
      if (newCommand === "setDeliverDate") {
        setOrderDetails((prv) => {
          return {
            ...prv,
            deliverDate: newData,
          };
        });
      }
    } finally {
      setCommand("");
    }
  }, [newCommand]);

  function submitData(event) {
    event.preventDefault();
    axios
    .post("http://localhost:8072/order/add", orderDetails)
    .then((response) => {
      
      alert("order added successfully!");
      // console.log(response.data.orderId);
      setOrderDetails({
        customerName: "",
        mobileNumber: "",
        city: "",
        deliverLocation: "",
        deliverDate: "",
        totalAmount: ""
      });
    })
    .catch((error) => {
      if (error.response) {
      // The server responded with an error status code (e.g., 400)

      console.log("Server responded with status code: " + error.response.status);
      console.log("Response data:", error.response.data);

    } else if (error.request) {
      // The request was made but no response was received
      
      console.log("No response received. The request was made.");

    } else {
      // An error occurred during the request setup

      console.log("Error setting up the request:", error.message);
    }
    })
  }

  return (
      <Box component="form" 
        onSubmit={submitData}
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
                setOrderDetails((p) => {
                  return {
                    ...p,
                    customerName: e.target.value,
                  };
                })
              }
              value={orderDetails.customerName}
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
                setOrderDetails((p) => {
                  return {
                    ...p,
                    mobileNumber: e.target.value,
                  };
                })
              }
              value={orderDetails.mobileNumber}
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
                setOrderDetails((p) => {
                  return {
                    ...p,
                    city: e.target.value,
                  };
                })
              }
              value={orderDetails.city}
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
                setOrderDetails((p) => {
                  return {
                    ...p,
                    deliverLocation: e.target.value,
                  };
                })
              }
              value={orderDetails.deliverLocation}
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
                setOrderDetails((p) => {
                  return {
                    ...p,
                    deliverDate: e.target.value,
                  };
                })
              }
              value={orderDetails.deliverDate}
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
            >
              Submit Order
            </Button>
          </Grid>
        </Grid>

        <Box
          display="flex"
          position="absolute"
          top={0}
          left={900}
          flexDirection="column"
          maxWidth={300}
          border={1}
          borderColor={"#1976d2"}
          justifyContent="center"
          alignItems="center"
          margin="auto"
          padding={4}
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
      </Box>
  );
}
