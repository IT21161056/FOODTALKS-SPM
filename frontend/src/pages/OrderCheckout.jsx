import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";

export default function OrderCheckout() {

  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    let total = window.location.search;
    const urlParams = new URLSearchParams(total);
    const totalAmount = urlParams.get("total");
    setTotalAmount(totalAmount); // Set the total amount in the state
  }, []);

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
    deliverDate: getCurrentDate(),
    totalAmount: 500
  });

  console.log(orderDetails);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's zero-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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
      console.log(response.data.orderId);
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
    if (error.response ) {
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
  <Container
    maxWidth="md"
    sx={{
      display: "flex",
      alignItems: "center",
      height: "90vh",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
        borderRadius: 10,
        borderColor: "#1976d2",
        pt: 10, pl: 10, pr: 10, pb: 10
      }}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 2}}>
        Personal Information
      </Typography>
      <Box component="form" onSubmit={submitData} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="customerName"
              required
              fullWidth
              size="small"
              id="customerName"
              label="Customer Name"
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
              type={"tel"}
              pattern="[0-9]{10}"
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

          <Grid item xs={12}>
            <TextField
              type="date"
              min={ getCurrentDate() } 
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
        <Button
          type="button"
          sx={{ mt: 3, ml: 12, borderRadius: 3, width: '200px' }}
          variant="contained"
          color="primary"
          onClick={() => navigate('/cartItem')}
        >
          Cancel Order
        </Button>
        <Button
          type="submit"
          sx={{ mt: 3, ml: 12, borderRadius: 3, width: '200px' }}
          variant="contained"
          color="primary"
        >
          Submit Order
        </Button>
      </Box>
    </Box>
  </Container>
);

}
