import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DeliveryStatusTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Delivery Person</TableCell>
            <TableCell>Delivery Status</TableCell>
            <TableCell>Delivery Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.orderId}</TableCell>
              <TableCell>{item.cusname}</TableCell>
              <TableCell>{item.deliverPerson}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.date.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveryStatusTable;
