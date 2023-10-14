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
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import {saveAs} from 'file-saver';

  function preventDefault(event) {
    event.preventDefault();
  }  
export default function AllOrders () {

    const {id} = useParams();

    const [orders, setOrders] = React.useState([]);
    // const [deliveryPerson, setDeliveryPerson] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [employee, setEmployee] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');

    // const employeeId = useParams();
    // const employeeName = employee.name;

    const ordersArray = orders;
    console.log(ordersArray);

    const theme = createTheme({
      palette: {
        primary: {
          main: '#FFA500', // Your primary color here
        },
      },
    });

    {/* Fetch all the orders using useEffect*/}

    useEffect(() => {
      const fetchOrders = async (event) => {

        setIsLoading(true);

        axios.get("http://localhost:8072/order/")
        .then((res) => {
          setIsLoading(false);
          setOrders(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });

      };
      fetchOrders();

    // function fetchEmployeeData() {
    //   axios
    //     .get('http://localhost:8072/delivery')
    //     .then(( response ) => {
    //       console.log(response.data)
    //       setEmployee(response.data);
    //     }).catch(( error ) => {
    //       alert("An error occures when fecthing employee data!!");
    //       console.log(error);
    //     });
    // }
    // fetchEmployeeData();
    }, [])

    const deleteOrder = async (orderId) => {
      axios
      .delete(`http://localhost:8072/order/delete/${orderId}`)
      .then(() => {
        setIsLoading(false);
        const newOrder = orders.filter((item) => item._id != orderId);
        setOrders(newOrder);
        alert('Order deleted succefully!!');
      })
      .catch((err) => {
        console.log("deletion order id " +orderId);
        alert(err);
      });
    };

    
    // Filter orders based on search query
    const filteredOrders = orders.filter((item) => {
      
      const { customerName, mobileNumber, city, totalAmount } = item;
      const mobileNumberAsString = mobileNumber.toString();
      const totalAmountAsString = totalAmount.toString();
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        customerName.toLowerCase().includes(lowerCaseQuery) ||
        mobileNumberAsString.includes(lowerCaseQuery) ||
        city.toLowerCase().includes(lowerCaseQuery) || 
        totalAmountAsString.toLowerCase().includes(lowerCaseQuery)
      );
    });

      function createAndDownLoadPdf(){
        axios.post('http://localhost:8072/orders_pdf/create-pdf',ordersArray)
        .then(() => axios.get('http://localhost:8072/orders_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'Order Report.pdf')
        })
    }

  return (
    <>
    <ThemeProvider theme={theme}>
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
        theme={theme.palette.primary.main}
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
          marginTop: '0.5rem',
          marginBottom: '1rem',
          width: '100%',
        }}
      />
      <TableContainer  sx={{ maxHeight: "70vh"}}>
        <Paper sx={{width: "100%"}} >
          <Table>

            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#FFA500' }}>

              <TableRow>
                <TableCell sx={{minWidth: 150}}>Customer Name</TableCell>
                <TableCell sx={{minWidth: 80}} >Mobile Number</TableCell>
                <TableCell sx={{minWidth: 80}} >City</TableCell>
                <TableCell sx={{minWidth: 150}}>Deliver Location</TableCell>
                <TableCell sx={{minWidth: 70}} >Deliver Date</TableCell>
                {/* <TableCell sx={{minWidth: 90}} >Deliver Person</TableCell> */}
                <TableCell sx={{minWidth: 80}} >Total Amount</TableCell>
                <TableCell sx={{minWidth: 60}} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {filteredOrders.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell >{item.customerName}</TableCell>
                    <TableCell >{item.mobileNumber}</TableCell>
                    <TableCell >{item.city}</TableCell>
                    <TableCell >{item.deliverLocation}</TableCell>
                    <TableCell >{item.deliverDate}</TableCell>
                    {/* <TableCell >{item.deliveryPerson}</TableCell> */}
                    <TableCell >{item.totalAmount}</TableCell>
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
                        onClick={() => deleteOrder(item._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>

          </Table>
        </Paper>
      </TableContainer>
      </ThemeProvider>
      </>
  )
}