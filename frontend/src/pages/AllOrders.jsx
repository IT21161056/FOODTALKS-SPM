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
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';

  function preventDefault(event) {
    event.preventDefault();
  }  
export default function AllOrders () {

    const [orders, setOrders] = React.useState([]);
    const [deliverPerson, setDeliverPerson] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);


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
    }, []);

    const deleteOrder = async (orderId) => {
      axios
      .delete("http://localhost:8072/order/delete" + orderId)
      .then(() => {
        setIsLoading(false);
        const newOrder = orders.filter((item) => item._id != orderId);
        setOrders(newOrder);
      })
      .catch((err) => {
        console.log("deletion order id " +orderId);
        alert(err);
      });
    };

  return (
      <TableContainer  sx={{ maxHeight: "60vh", padding: 1 }}>
        <Typography
          mb={2}
          sx={{ fontWeight: 600, fontSize: 20, color: "primary" }}
        >
          Order List
        </Typography>
        <Paper sx={{width: "100%"}}>
          <Table stickyHeader aria-label="sticky table">

            <TableHead>

              <TableRow >
                <TableCell sx={{minWidth: 150}}>Customer Name</TableCell>
                <TableCell sx={{minWidth: 80}} >Mobile Number</TableCell>
                <TableCell sx={{minWidth: 80}} >City</TableCell>
                <TableCell sx={{minWidth: 150}}>Deliver Location</TableCell>
                <TableCell sx={{minWidth: 70}} >Deliver Date</TableCell>
                <TableCell sx={{minWidth: 90}} >Deliver Person</TableCell>
                <TableCell sx={{minWidth: 80}} >Total Amount</TableCell>
                <TableCell sx={{minWidth: 70}} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {orders.map((item) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell >{item.customerName}</TableCell>
                    <TableCell >{item.mobileNumber}</TableCell>
                    <TableCell >{item.city}</TableCell>
                    <TableCell >{item.deliverLocation}</TableCell>
                    <TableCell >{item.deliverDate}</TableCell>
                    <TableCell >{item.deliverPerson}</TableCell>
                    <TableCell >{item.totalAmount}</TableCell>
                    <TableCell >
                      <Button sx={{backgroundColor: "primary"}}
                        onClick={() => <Link to ={`/dashboard/updateOrder${item._id}`}></Link>}                
                      ></Button>
                      <IconButton
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
  )
}