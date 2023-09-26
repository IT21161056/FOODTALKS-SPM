import React from 'react'
import "./store.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, json, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = () => {

  const [cart, setCart] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const navigate = useNavigate()

  const calculateTotalAmount = () => {
    const amount = cart.reduce((total, item) => {
      return total + item.qnty * item.price; // Fix the typo here
    }, 0);
  
    setTotalAmount(amount);
  }; 
  

  React.useEffect(() => {
    calculateTotalAmount();
  }, [cart]);


  React.useEffect(() => {

    function fetchAllData() {

      if (sessionStorage.getItem("cartItems")) {
        setCart(JSON.parse(sessionStorage.getItem("cartItems")));
      }

    }
    fetchAllData();
  }, []);


  //increment quantity
  const incrementQuantity =(itemid) => {
      const updatedCartItems = cart.map((item) => {
        if(item._id == itemid){
          return {...item,qnty:item.qnty+1}
        }else{
          return item;
        }
      });
      calculateTotalAmount();
      setCart(updatedCartItems)
      sessionStorage.setItem("cartItems",JSON.stringify(updatedCartItems))
  }


  //decrement quantity
  const decremetQuantity = (itemid) => {
      const updatedCartItems = cart.map((item) => {
        if(item._id == itemid){
          if(item.qnty == 0){
            return {...item,qnty:item.qnty}
          }else{
            return {...item,qnty:item.qnty-1}
          }
        }else{
            return item
        }
      });
      calculateTotalAmount();
      setCart(updatedCartItems)
      sessionStorage.setItem("cartItems",JSON.stringify(updatedCartItems))
  }

  const handleRemove = (itemid) => {
      const updatedCartItems = cart.filter((item) => {
        if(item._id != itemid){
           return item
        }
      })
      setCart(updatedCartItems);
      sessionStorage.setItem("cartItems",JSON.stringify(updatedCartItems))
  }

  const goToOrder =(total) =>{
    navigate(`/order?total=${total}`)
  }

  return (
    <div>
      <Link to='/menu'><Button variant='outlined' style={{position:'relative',top:50,marginLeft:30}}>Go to menu</Button></Link>
      <Typography sx={{display:'flex',justifyContent:'center',fontSize:30}}>Your Cart</Typography>
      <TableContainer component={Paper} sx={{ width: 1050, display: 'flex', marginLeft: 30}}>
        <Table sx={{ minWidth: 100, gap: '2rem' }} aria-label="caption table">

          <TableHead>
            <TableRow sx={{backgroundColor:'#b3ecff'}}>
              <TableCell sx={{ fontWeight: 'bold' }}>Resturant</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell >{item.resturant}</TableCell>
                <TableCell >{item.dish}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell sx={{fontSize:15}} >
                <button style={{margin:15,border:'none'}} onClick={()=> incrementQuantity(item._id)}>+</button>{item.qnty}
                <button style={{margin:15,border:'none'}} onClick={()=> decremetQuantity(item._id)}>-</button></TableCell>
                <TableCell >
                <img style={{ borderRadius: '20px', width: '80px', height: '80px' }} src={item.image} alt='food' />
                </TableCell>
                <TableCell><IconButton onClick={()=>handleRemove(item._id)} sx={{color:'red'}}>
                  <DeleteIcon/>
                </IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <Typography sx={{fontSize:22,marginTop:5,marginLeft:130}}><b>Total price</b> :&nbsp;<b>{totalAmount}</b></Typography>
     
      <Button  onClick={() => goToOrder(totalAmount)}  sx={{display:'flex',marginLeft:135,marginTop:2,
      backgroundColor:'#b3ecff',color:'black'}}>Procced to pay</Button>
    </div>
  )
}

export default CartItem
