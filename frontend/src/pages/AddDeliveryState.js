import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";


const AddDeliveryState = () => {

  const {id} = useParams();
  console.log('in add order >>>',id)
  const navigate = useNavigate();


  const [person, setPerson] = useState([]); 
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [deliverystateDetails, setDeliveryStateDetails] = useState({
    cusname: "",
    status: "",
  });
  
  console.log(deliverystateDetails);

  const personId = useParams();
  const personName = person.customerName;
  console.log(person);

  const deliverystateName = deliverystateDetails.cusname;
  console.log("customer name >>> "+deliverystateName);

  useEffect(() => {
    function fetchAllData(){
      axios
        .get(`http://localhost:8072/deliverystate/singleDeliveryState/${id}`)
        .then(( response ) => {
          console.log(response.data)
          setDeliveryStateDetails(response.data);
        }).catch(( error ) => {
          alert('An error occured when fecthing particular order');
          console.log(error);
        })
    }
    fetchAllData();
  }, []);
  
  console.log("deliverystate id >>> "+id);

  useEffect(() => {
    function fetchPersonData() {
      axios
        .get('http://localhost:8072/order')
        .then(( response ) => {
          console.log(response.data)
          setPerson(response.data);
        }).catch(( error ) => {
          alert("An error occures when fecthing employee data!!");
          console.log(error);
        });
    }
    fetchPersonData();
  }, [])

  console.log(deliverystateDetails);

  const handleSubmit = async (event) => {
    event?.preventDefault();
    setIsSubmiting(true);
    axios
      .post("http://localhost:8072/deliverystate/add", deliverystateDetails)
      .then((res) => {
        alert(res.data.message);
        setIsSubmiting(false);
        setDeliveryStateDetails({
          cusname: "",
          state: "",
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
        <Typography variant="h4" sx={{ mb: 2}}>
          Add Delivery Status Details 
        </Typography>
        <form onSubmit={handleSubmit}> 
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="cusname"
                required
                fullWidth
                size="small"
                id="cusname"
                label="Customer Name"
                autoFocus
                // key={cusname._id}
                value={person.customerName} 
                // value={cusname.name}              
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="state"
                required
                fullWidth
                size="small"
                id="state"
                label="Delivery Status"
                autoFocus
                value={deliverystateDetails.state} 
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            sx={{ mt: 3, borderRadius: 3, width: '500px' }}
            variant="contained"
            color="primary"
          >
          Submit Delivery State
          </Button>
        </form>
      </Box>
    </Container>
    );
  }

export default AddDeliveryState