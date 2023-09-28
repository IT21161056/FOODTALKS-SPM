import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, NavLink, json, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import axios from 'axios';

const ManageMenu = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [cardData, setCardData] = React.useState([]);
  const [search,setSearch] = useState("");
  
  
  const generatePDF = () => {
    const doc = new jsPDF();

    const text = "Today Menu";
    const textWidth = doc.getTextWidth(text);
    const x = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, x, 10);

    // Define styles for the table.
    const styles = {
      font: 'helvetica',
      fontSize: 12,
      textColor: [0, 0, 0],
      cellPadding: 5,
      rowHeight: 20,

      tableWidth: 'auto',
      // 'auto' will automatically adjust the table width based on content.
    };

    doc.autoTable({
      head: [['Resturant', 'Price', 'Dish', 'Rating', 'Quantity', 'Review']],
      body: cardData.map((dcardData) => [
        dcardData.resturant,
        dcardData.price,
        dcardData.dish,
        dcardData.rating,
        dcardData.qnty,
        dcardData.review,
      ]),
      startY: 50,
      styles: styles,
    });

    doc.save('file_report.pdf');
  };

  const deletequotation = async (id) => {
    try {
      await axios.delete(`http://localhost:8072/cart/delete/${id}`);
      const newdata = cardData.filter((el) => el._id !== id);
      setCardData(newdata);
    } catch (error) {
      console.error(error);
    }

  }

  const sendRequest = async (search) => {

    const res = await axios.get(`http://localhost:8072/cart?search=${search}`).catch((err) => console.log(err))
    const data = await res.data;
    return data;
  }

  React.useEffect(() => {
    sendRequest(search).then((data) => setCardData(data))

  }, [search])

  return (
    <>

    <Button variant='success' onClick={generatePDF} 
    style={{ backgroundColor: 'green',color:'white', margin: '20px' }}>Generate report</Button>

     <Link to="/addnew">
          <Button variant='outlined' name='Add product' style={{marginLeft:'600px'}}
          item xs={8} sm={6} className='addbtn'>+ Add Product</Button>
    </Link>
  
     <TableContainer component={Paper} sx={{maxWidth:'90%',marginLeft:'40px'}}>
        <Table sx={{ minWidth: 200}} aria-label="caption table">
          <TableHead>
            <TableRow sx={{backgroundColor:'#b3ecff'}}>
              <TableCell sx={{ fontWeight: 'bold' }}>Resturant</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Review</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {cardData.map((item, index) => (
              <TableRow key={index}>
                <TableCell >{item.resturant}</TableCell>
                <TableCell >{item.dish}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell >{item.qnty}</TableCell>
                <TableCell >{item.review}</TableCell>
                <TableCell >{item.rating}</TableCell>
                <TableCell >
                <img style={{ borderRadius: '20px', width: '80px', height: '80px' }} src={item.image} alt='food' />
                </TableCell>
                <TableCell>
                  <div onClick={() => { deletequotation(item._id); toast.error("successfully deleted the product") }} >
                  <IconButton  sx={{color:'red'}}><DeleteIcon/></IconButton>
                  </div>
                  <NavLink to={`/update/${item._id}`} className="text-decoration-none">
                  <IconButton sx={{color:'blue'}}><ModeEditIcon/></IconButton>
                  </NavLink>
                </TableCell>
              </TableRow>
          ))}
          </TableBody>

        </Table>
      </TableContainer>
      <ToastContainer position="bottom-center" autoClose={400} />
      </>

  )
};

export default ManageMenu;
