import React from "react";
import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function OrderCheckout() {

const [order, setOrder] = useState({
    customerName: "",
    mobileNumber: "",
    city: "",
    deliverLocation: "",
    deliverDate: "",
    totalAmount: ""
  });

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

  return (
    <form>
      <Box
        display="flex"
        position="absolute"
        top={80}
        left={340}
        bottom={40}
        flexDirection="column"
        maxWidth={1000}
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
          Update Order
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
              type={"text"}
              variant="outlined"
              style={{ width: "300px" }}
              name="deliverPerson"
              required
              fullWidth
              size="small"
              id="deliverPerson"
              label="Deliver person name"
              autoFocus
              onChange={(e) =>
                setOrder((p) => {
                  return {
                    ...p,
                    deliverPerson: e.target.value,
                  };
                })
              }
              value={order.deliverPerson}
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

        <Grid container spacing={0}>
          <Grid sx={{ marginLeft: '350px' }}>
            <Button
              type="submit"
              sx={{ margin: 3, borderRadius: 3, width: '200px', backgroundColor: 'grey' }}
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
            >
              Update Order
            </Button>
          </Grid>
        </Grid>
      </Box>

    </form>
  );
}
