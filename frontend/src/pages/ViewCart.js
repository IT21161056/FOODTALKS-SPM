import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
    <div style={{display:'flex',flexDirection:'row'}}>
    <img style={{display:'flex',position:"relative",left:"100px",marginTop:'60px',width:500,height:400}}
     src={inputdata.image} alt='food' />
     <div style={{marginLeft:'150px',marginTop:'70px'}}>
     <Typography sx={{fontWeight: 500,fontSize:30}}>Resturant :{inputdata.resturant}</Typography>
     <Typography sx={{fontWeight: 500,fontSize:25,marginTop:2}}>Price Rs.{inputdata.price}</Typography>
     <Typography sx={{fontWeight: 500,fontSize:25,marginTop:2}}>Dish : {inputdata.dish}</Typography>
     <Typography sx={{fontWeight: 500,fontSize:20,marginTop:2}}>Rating : {inputdata.rating}</Typography>
     <Typography sx={{fontWeight: 500,fontSize:20,marginTop:2}}>Quantity : {inputdata.qnty}</Typography>
     <Typography sx={{marginTop:3}}>Reveiw </Typography>
     <Typography sx={{fontWeight: 500,fontSize:20,marginTop:2}}>{inputdata.review}</Typography>
     </div>
    </div>
  )
}

export default ViewCart
