import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './store.css'

const OrderItem = () => {
    const { id } = useParams()
    const [inputdata, setInputData] = useState({
        resturant: "",
        price: "",
        dish: "",
        qnty: "",
        rating: "",
        image: "",
        address: "",
        phone: ""
    })

    const GetQuoteFun = async () => {
        try {
            const response = await axios.get(`http://localhost:8072/cart/singlecard/${id}`);
            if (response.status === 200) {
                setInputData(response.data)
                console.log(response.data)
            } else {
                console.log("Error getting quotation");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    const sendRequest = async () => {
        try {
          console.log(inputdata.phone)
        } catch (err) {
          console.log(err);
          throw err;
        }
      };



    useEffect(() => {
        GetQuoteFun()
    }, [])


    return (
        <div className='bx'>

            <div className='sh'>
                <div className='imgz'>
                    <img src={inputdata.image} alt='food' className='circular-image' />
                </div>
                <div className='row'>
                    <div className='f1'>
                        <Typography className='tx' >Resturant Name:</Typography>
                        <TextField size="small" value={inputdata.dish} name='resturant' placeholder='Enter Resturant Name' variant="outlined" className='same' />
                    </div>
                    <div className='f2'>
                        <Typography className='tx'>Price:</Typography>
                        <TextField size="small" value={inputdata.price} name='price' type='number' placeholder='Enter Price' variant="outlined" className='same' />
                    </div>
                </div>

                <div className='row'>
                    <div className='f3'>
                        <Typography className='tx'>Product Name:</Typography>
                        <TextField size="small" name='dish' value={inputdata.resturant} placeholder='Enter product name' la variant="outlined" className='same' />
                    </div>
                    <div className='f4'>
                        <Typography className='tx'>Quantity:</Typography>
                        <TextField type='number' name='qnty' value={inputdata.qnty} placeholder='Enter quantity' size="small" variant="outlined" className='same' />
                    </div>
                </div>

                <div className='row'>
                    <div className='f5'>
                        <Typography className='tx'>Rating:</Typography>
                        <TextField size="small" name='rating' value={inputdata.rating} placeholder='Enter Ratings' variant="outlined" className='same' />
                    </div>

                </div>

                <div className='f6'>
                    <Typography className='tx'>Enter your address</Typography>
                    <TextField placeholder='Enter your feedbacks' value={inputdata.address} name='review' style={{ width: '640px' }} size="small" variant="outlined" className='same' />
                </div>
                <div className='f6'>
                    <Typography className='tx'>Enter phone number</Typography>
                    <TextField placeholder='Enter your feedbacks' value={inputdata.phone} name='review' style={{ width: '640px' }} size="small" variant="outlined" className='same' />
                </div>
                <div className='row' style={{ width: '640px', display: 'flex', marginTop: '30px' }}>

                    <Button onClick ={sendRequest} className='btb' style={{backgroundColor: '#b36b00', color: 'white', marginLeft: '12px', display: 'flex', justifyContent: 'center', marginTop: '5px'}}
                    variant="contained" >Order</Button>
                </div>

            </div>

        </div>
    )
}

export default OrderItem
