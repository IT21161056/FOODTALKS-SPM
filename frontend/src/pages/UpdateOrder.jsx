import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";


const UpdateOrder = () => {
  const {id} = useParams()
  console.log('in update order >>>',id)
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]); 

  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    mobileNumber: "",
    city: "",
    deliverLocation: "",
    deliverDate: "",
    totalAmount: "",
    deliveryPerson: ""
  });
  
  console.log(orderDetails);

  const employeeId = useParams();
  const employeeName = employee.name;

  console.log(employee);

  const orderId = useParams();
  const orderName = orderDetails.customerName;
  console.log(orderName);

  useEffect(() => {
    function fetchAllData(){
      axios
        .get(`http://localhost:8072/order/singleOrder/${id}`)
        .then(( response ) => {
          console.log(response.data)
          setOrderDetails(response.data);
        }).catch(( error ) => {
          alert('An error occured when fecthing particular order');
          console.log(error);
        })
    }
    fetchAllData();
  }, []);
  
  console.log("order id : "+orderId.id);

  useEffect(() => {
    function fetchEmployeeData() {
      axios
        .get('http://localhost:8072/delivery')
        .then(( response ) => {
          console.log(response.data)
          setEmployee(response.data);
        }).catch(( error ) => {
          alert("An error occures when fecthing employee data!!");
          console.log(error);
        });
    }
    fetchEmployeeData();
  }, [])

  function updateOrderData( event ){
    event.preventDefault();
    axios
      .put('http://localhost:8072/order/update/'+orderId.id, orderDetails)
      .then(() => {
        alert("Order Successfully Updated!");
        navigate("/dashboard/allOrders");
      }).catch(( error ) => {
        alert("An error occured when updating the order!!");
        console.log( error );
      })
  }

   function onChange(e){
     const {name, value} = e.target;
    setOrderDetails((prevData) => ({
        ...prevData,
        [name] : value
        
      }));
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
          pt: 10, pl: 10, pr: 10, pb: 10
        }}
      >
        <Typography component="h1" onSubmit={updateOrderData} variant="h4" sx={{ mb: 2}}>
          Update Order Details 
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
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
                onChange={onChange} 
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
                onChange={onChange} value={orderDetails.mobileNumber} 
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
                onChange={onChange} value={orderDetails.city}              
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
                onChange={onChange} value={orderDetails.deliverLocation} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="deliverDate"
                required
                fullWidth
                size="small"
                id="deliverDate"
                label="Deliver Date"
                autoFocus  
                onChange={onChange} value={orderDetails.deliverDate} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="totalAmount"
                required
                fullWidth
                size="small"
                id="totalAmount"
                label="Total Amount"
                autoFocus
                onChange={onChange} value={orderDetails.totalAmount} 
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                name="deliveryPerson"
                required
                fullWidth
                size="small"
                id="deliveryPerson"
                autoFocus
                onChange={onChange} value={employee.employeeName || ''} 
              >
                <MenuItem value="">Select delivery person</MenuItem>
                {
                  employee.map(( emp ) => {
                    return <MenuItem 
                              key={emp._id} 
                              value={emp.name}
                            >
                              {emp.name}
                            </MenuItem>
                  })
                }
              </Select>
            </Grid>

          </Grid>
          <Button
            type="button"
            sx={{ mt: 3, borderRadius: 3, width: '200px' }}
            variant="contained"
            color="primary"
            onClick={() => navigate('/cartItem')}
          >
            Update Order
          </Button>
        </Box>
      </Box>
    </Container>
    );
  }

export default UpdateOrder