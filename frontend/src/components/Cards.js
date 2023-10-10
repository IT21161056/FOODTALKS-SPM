import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'
import Dropdown from 'react-bootstrap/Dropdown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { alanAtom, command, data } from "../atom/alanAtom"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Grid, TextField, Typography } from '@mui/material';

const Cards = () => {


  const [message, setMessage] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newValue, setValue] = useAtom(data);
  const [search,setSearch] = useState("");

  const [cardData, setCardData] = useState([]);

  useEffect(() => {

    if (message == 'menu') {
      for (let i = 0; i < cardData.length; i++) {

        if (newAlanAtom) {
          newAlanAtom.playText(`${cardData[i].dish}` + 'price is' + `${cardData[i].price}` + `rupees`)
        }

      }

    }

    if (message == 'noodles') {
      window.open(`http://localhost:3000/order/64dd8b78c40d567c3883a80c`)
    }
    if (message == 'order_burger') {
      window.open(`http://localhost:3000/order/64d3c75180485394970aba0b`)
    }
    if (message == 'open_cart') {
      newAlanAtom.playText('Opening the cart')
      window.open('http://localhost:3000/cartitem')
    }
    if(message == 'menu_back'){
      newAlanAtom.playText('Going back to menu')
      window.open('http://localhost:3000/menu')
    }

    if (message == 'chicken_burger') {
      addToCart(cardData[0])
    }
    if (message == 'egg_rotti') {
      addToCart(cardData[1])
    }


  }, [message])


  const sendRequest = async (search) => {

    const res = await axios.get(`http://localhost:8072/cart?search=${search}`).catch((err) => console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest(search).then((data) => setCardData(data))

  }, [search])



  const addToCart = (element) => {
    let cartItems = [];
  
    if (sessionStorage.getItem("cartItems") !== null) {
      cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  
      const alreadyAdded = cartItems.some(item => item._id === element._id);
  
      if (alreadyAdded) {
        toast.error('Item already Added!', {
          autoClose: 100,
          position: "top-center",
        });
        return;
      }
    }
  
    cartItems.push(element);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    toast.success('Item Added!', {
      autoClose: 100,
      position: "top-center",
    });
  };
  
  return (
    <div className='container mt-3'>
      <h2 className='text-center'>Today Menu</h2>
      <div className='searchcomponent'>

      <Grid >
        <Box sx={{ width: 700,display:'flex',marginLeft:'150px' }} item xs={12} sm={6}>
          <TextField  onChange={(e)=>setSearch(e.target.value)} inputProps={{style: {height: "16px",width:500}}} placeholder='Search foods' />
          <Button style={{backgroundColor:'#ff9933',marginBottom:1,
          marginLeft:18,paddingRight:20,paddingLeft:20,color:'white'}} variant='contained'>Search</Button>
        </Box>
      </Grid>
       
      </div>
      <div className='ct'>
        {
          cardData.map((element, id) => {
            return (
              <>
                <Card key={id} className='bh' style={{ width: '18rem', mt: '10px', border: 'none' }}  >
                  <Card.Img variant="top" src={element.image} style={{ height: "15rem" }} />
                  <Card.Body>
                    <Card.Title>{element.dish}</Card.Title>
                    <Card.Text style={{ fontSize: '17px', fontWeight: '2rem' }}>
                      Price : Rs.{element.price}
                    </Card.Text>
                    <Button variant="primary" style={{ backgroundColor: '#ff8c1a',border: 'none' }} onClick={() => addToCart(element)} >
                      Add to Cart</Button>
                    <Button variant="primary" style={{ marginLeft: '55px', backgroundColor: '#ff9933', border: 'none' }} href={`order/${element._id}`} >
                      Buy Now</Button>
                    <ToastContainer position="bottom-center" autoClose={400} />
                  </Card.Body>
                </Card>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cards
