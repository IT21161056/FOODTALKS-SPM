import React from 'react'
import "./store.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';



const CartItem = () => {

  const [cart, setCart] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const calculateTotalAmount = () => {
    const amount = cart.reduce((total, item) => {
      return total + 1 * item.price; // Fix the typo here
    }, 0);
  
    setTotalAmount(amount);
  }; 
  
  React.useEffect(() => {
    calculateTotalAmount();
  }, [cart]);


  console.log(cart);
  React.useEffect(() => {

    function fetchAllData() {

      if (sessionStorage.getItem("cartItems")) {
        setCart(JSON.parse(sessionStorage.getItem("cartItems")));
      }

    }
    fetchAllData();
  }, []);


  return (
    <div>
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
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell >{item.resturant}</TableCell>
                <TableCell >{item.dish}</TableCell>
                <TableCell >{item.price}</TableCell>
                <TableCell sx={{fontSize:15}} >
                <button style={{margin:15,border:'none'}} onClick={()=>{}}>+</button>{item.qnty}
                <button style={{margin:15,border:'none'}} onClick={()=>{}}>-</button></TableCell>
                <TableCell >
                <img style={{ borderRadius: '20px', width: '80px', height: '80px' }} src={item.image} alt='food' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <Typography sx={{fontSize:22,marginTop:5,marginLeft:130}}>Total price :{totalAmount}</Typography>
    </div>
  )
}

export default CartItem
