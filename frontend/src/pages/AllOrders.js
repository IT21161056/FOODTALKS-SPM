import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Typography } from '@mui/material';

const AllOrders = () => {

    const [order, setOrder] = React.useState([]);

  return (
    <div>

        <Typography sx={{display:'flex',justifyContent:'center', fontSize:30, marginTop: 5}}>All Orders</Typography>
        <TableContainer  sx={{ width: 1300, display: 'flex', marginLeft: 25, marginTop: 5}}>
        <Table sx={{ minWidth: 100, gap: '4rem' }} aria-label="caption table">

          <TableHead>
            <TableRow sx={{backgroundColor:'#bac2bc', color:'white'}}>
              <TableCell sx={{ fontWeight: 'bold' }}>OrderI Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Deliver Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Deliver Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Deliver Person</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order.map((item, index) => (
              <TableRow key={index}>
                <TableCell >{item._id}</TableCell>
                <TableCell >{item.customerName}</TableCell>
                <TableCell >{item.mobileNumber}</TableCell>
                <TableCell >{item.city}</TableCell>
                <TableCell >{item.deliverLocation}</TableCell>
                <TableCell >{item.deliverDate}</TableCell>
                <TableCell >{item.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  )
}

export default AllOrders;