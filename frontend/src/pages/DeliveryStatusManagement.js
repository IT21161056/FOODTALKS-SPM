import React, { useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
// import jsPDF from 'jspdf';
import {saveAs} from 'file-saver';

  function preventDefault(event) {
    event.preventDefault();
  }  
export default function AllOrders () {

    const {id} = useParams();

    const [deliverystates, setDeliveryStates] = React.useState([]);
    const [cusname, setCusname] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [person, setPerson] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');

    const personId = useParams();
    const personName = person.customerName;

    const deliverystatesArray = deliverystates;
    console.log(deliverystatesArray);

    {/* Fetch all the orders using useEffect*/}

    useEffect(() => {
      const fetchDeliveryStates = async (event) => {

        setIsLoading(true);

        axios.get("http://localhost:8072/deliverystate/")
        .then((res) => {
          setIsLoading(false);
          setDeliveryStates(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });

      };
      fetchDeliveryStates();

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

    const deleteDeliveryState= async (deliverystateId) => {
      axios
      .delete("http://localhost:8072/deliverystate/delete/${deliverystateId}")
      .then(() => {
        setIsLoading(false);
        const newDeliveryState = deliverystates.filter((item) => item._id != deliverystateId);
        setDeliveryStates(newDeliveryState);
        alert('Delivery deleted succefully!!');
      })
      .catch((err) => {
        console.log("deletion delivery id " +deliverystateId);
        alert(err);
      });
    };

    
    // Filter orders based on search query
    const filteredDeliveryStates = deliverystates.filter((item) => {
      
      const { cusname } = item;
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        cusname.toLowerCase().includes(lowerCaseQuery)
      );
    });

      function createAndDownLoadPdf(){
        axios.post('http://localhost:8072/deliverystates_pdf/create-pdf',deliverystatesArray)
        .then(() => axios.get('http://localhost:8072/deliverystates_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }

    // // Function to generate the PDF report
    // const generateReport = (orders) => {
    // // Create a new PDF document
    // const doc = new jsPDF();
  
    // // Define the columns for the table
    // const columns = [
    //   { title: 'Customer Name', dataKey: 'customerName' },
    //   { title: 'Mobile Number', dataKey: 'mobileNumber' },
    //   { title: 'City', dataKey: 'city' },
    //   { title: 'Delivery Location', dataKey: 'deliverLocation' },
    //   { title: 'Delivery Date', dataKey: 'deliverDate' },
    //   { title: 'Delivery Person', dataKey: 'deliveryPerson' },
    //   { title: 'Total Amount', dataKey: 'totalAmount' },
    // ];
  
    // // Create an array of data for the table
    // const data = orders.map((order) => ({
    //   customerName: order.customerName,
    //   mobileNumber: order.mobileNumber,
    //   city: order.city,
    //   deliverLocation: order.deliverLocation,
    //   deliverDate: order.deliverDate,
    //   deliveryPerson: order.deliveryPerson,
    //   totalAmount: order.totalAmount,
    // }));
  
    // // Set the table width and position
    // doc.autoTableSetDefaults({
    //   startY: 20,
    //   margin: { top: 20},
    //   headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    //   bodyStyles: { textColor: 0 },
    // });
  
    // // Add the table to the PDF document
    // doc.autoTable(columns, data);
  
    // // Save the PDF
    // doc.save('order_report.pdf');
    // };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          mb={2}
          sx={{ fontWeight: 600, fontSize: 20, color: "primary", mt: 2 , ml: 2}}
        >
          Order List
        </Typography>
        <Button
          variant="contained"
          color="warning"
          sx={{ marginTop: '10px', marginLeft: 'auto', mr: 2.5 }}
          onClick={createAndDownLoadPdf}
        >
          Generate Report
        </Button>
    </div>
    <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: 'white', 
          width: "100%",
          margin: 'auto',
          marginLeft: "10px" 
        }}
      />
      <TableContainer  sx={{ maxHeight: "70vh", padding: 1}}>
        <Paper sx={{width: "100%"}} >
          <Table stickyHeader aria-label="sticky table">

            <TableHead>

              <TableRow >
                <TableCell sx={{minWidth: 150}}>Customer Name</TableCell>
                <TableCell sx={{minWidth: 80}} >Status</TableCell>
                <TableCell sx={{minWidth: 60}} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {filteredDeliveryStates.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell >{item.cusname}</TableCell>
                    <TableCell >{item.state}</TableCell>
                    <TableCell >
                      <IconButton sx={{ backgroundColor: "primary" }}>
                        <Link
                          to={`/dashboard/updateOrder/${item._id}`}
                          state={{ orderData: item }}
                        >
                        <EditIcon />
                        </Link>
                      </IconButton>
                      <IconButton 
                        color="error"
                        children={<DeleteForeverIcon/>}
                        onClick={() => deleteDeliveryState(item._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>

          </Table>
        </Paper>
      </TableContainer>
      </>
  )
}