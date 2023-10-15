import { Typography } from '@mui/material';
import axios from 'axios';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
const ViewCart = () => {

  const { id } = useParams()
  const [inputdata, setInputData] = useState({})
  console.log(inputdata)

  const GetQuoteFun = async () => {
    try {
      const response = await axios.get(`http://localhost:8072/cart/singlecard/${id}`);
      if (response.status === 200) {
        setInputData(response.data)
      } else {
        console.log("Error getting quotation");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    GetQuoteFun()
  }, [])

  return (
    <>
    <div style={{minHeight:'100vh'}}>
      <Link to="/menu">
        <Button variant='outlined' name='Add product' style={{ marginLeft: '-190px',marginTop:'20px', color: 'black', borderBlockColor: '#ffbf80' }}
          item xs={8} sm={6} className='addbtn'>Go to menu</Button>
      </Link>
      <div style={{backgroundColor:'#ffebcc',margin:'30px',marginTop:'25px'}}>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <img style={{ display: 'flex', position: "relative", borderRadius: '10px', outlineStyle: 'solid', outlineColor: '#b36b00', left: "100px",margin:'10px', width: 500, height: 400 }}
          src={inputdata.image} alt='food' />
        <div style={{ marginLeft: '150px', marginTop: '35px' }}>
          <Typography sx={{ fontWeight: 400, fontSize: 25 }}>Resturant :&nbsp;&nbsp;&nbsp;{inputdata.resturant}</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 25, marginTop: 2 }}>Price :&nbsp;&nbsp;&nbsp; Rs.{inputdata.price}</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 25, marginTop: 2 }}>Dish : &nbsp;&nbsp;&nbsp;{inputdata.dish}</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 25, marginTop: 2 }}>Rating : &nbsp;&nbsp;&nbsp;{inputdata.rating}</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 25, marginTop: 2 }}>Quantity : &nbsp;&nbsp;&nbsp;{inputdata.qnty}</Typography>
          <Typography sx={{ marginTop: 3,fontSize: 25 }}>Reveiw &nbsp;&nbsp;&nbsp;</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 25, marginTop: 2 }}>{inputdata.review}</Typography>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default ViewCart
