import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import f3 from '../asset/f3.png'
import { createTheme } from '@mui/material/styles';

export default function OrderCheckout() {

  //get the total amount using params
  let total = window.location.search;
  const urlParams = new URLSearchParams(total);
  const totalAmount = urlParams.get("total");
  console.log(totalAmount);

  console.log(totalAmount);

  const navigate = useNavigate();
  const pageName = useLocation();
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);
  const [isSubmiting, setIsSubmiting] = useState(false);

  console.log(newData);
  console.log(newAlanAtom);

  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    mobileNumber: "",
    city: "",
    deliverLocation: "",
    deliverDate: getCurrentDate(),
    totalAmount: totalAmount
  });

  console.log(orderDetails);
  console.log(totalAmount);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFA500', //primary color here
      },
    },
  });

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's zero-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

    const handleSubmit = async (event) => {
    event?.preventDefault();
    setIsSubmiting(true);
    axios
      .post("http://localhost:8072/order/add", orderDetails)
      .then((res) => {
        alert(res.data.message);
        setIsSubmiting(false);
        setOrderDetails({
          customerName: "",
          mobileNumber: "",
          city: "",
          deliverLocation: "",
          deliverDate: getCurrentDate(),
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
  };

  console.log('check before command >>> ' + orderDetails.customerName);
  console.log('check before command >>> ' + orderDetails.totalAmount);
  console.log('check before command >>> ' + orderDetails.city);

  useEffect(() => {
    try{
      if (newCommand === "setCustomerName") {
        console.log("hello");
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
    } finally {
      setCommand("");
    }
  }, [newCommand]);

  return (

<Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: 'whitesmoke',
        alignItems: "center", // Center the content vertically
      }}
    >
      <Container maxWidth="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <img
              src={f3}
              alt="image"
              style={{
                maxWidth: '90%', // Make the image responsive
                height: 'auto', // Maintain aspect ratio
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                padding: "2rem",
                minHeight: '70vh',
                mt: -5
              }}
            >
              <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                Personal Information
              </Typography>

              <form onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="customerName"
                      required
                      fullWidth
                      color="warning"
                      size="small"
                      id="customerName"
                      label="Customer Name"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                      value={orderDetails.customerName}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="mobileNumber"
                      required
                      fullWidth
                      color="warning"
                      size="small"
                      id="mobileNumber"
                      label="Mobile Number"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          mobileNumber: e.target.value,
                        }))
                      }
                      value={orderDetails.mobileNumber}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="city"
                      required
                      color="warning"
                      fullWidth
                      size="small"
                      id="city"
                      label="City"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      value={orderDetails.city}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      name="deliverLocation"
                      required
                      color="warning"
                      fullWidth
                      size="small"
                      id="deliverLocation"
                      label="Deliver Location"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          deliverLocation: e.target.value,
                        }))
                      }
                      value={orderDetails.deliverLocation}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      type="date"
                      min={getCurrentDate()}
                      name="deliverDate"
                      required
                      color="warning"
                      fullWidth
                      size="small"
                      id="deliverDate"
                      label="Deliver Date"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          deliverDate: e.target.value,
                        }))
                      }
                      value={orderDetails.deliverDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="totalAmount"
                      required
                      fullWidth
                      size="small"
                      color="warning"
                      id="totalAmount"
                      label="Total Amount"
                      autoFocus
                      onChange={(e) =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          totalAmount: e.target.value,
                        }))
                      }
                      value={totalAmount}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/cartItem")}
                  sx={{ mt: 2, width: '100%' }}
                >
                  Cancel Order
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  disabled={isSubmiting}
                  sx={{ mt: 2, width: '100%' }}
                >
                  Submit Order
                </Button>
                
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}