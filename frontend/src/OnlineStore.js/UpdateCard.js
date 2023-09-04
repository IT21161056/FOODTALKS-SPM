import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import "./store.css"
import { toast } from 'react-toastify';

const UpdateCard = () => {

  const navigate = useNavigate()

  const [inputdata, setInputData] = useState({
    resturant: "",
    price: "",
    dish: "",
    qnty: "",
    rating: "",
    image: "",
    review: ""
  })

  //console.log(inputdata)


  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })

  }

  const [resturanterror, setResturanterror] = useState("");
  const [pricerror, setPriceError] = useState("");
  const [producterror, setProductError] = useState("");
  const [quantityerror, setQuantityError] = useState("");
  const [ratingerror, setRatingError] = useState("");
  const [imageerror, setImageError] = useState("");
  const [reviewerror, setReveiwError] = useState("");

  const { id } = useParams()

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
      const res = await axios.put(`http://localhost:8072/cart/update/${id}`, {
        resturant: inputdata.resturant,
        price: inputdata.price,
        dish: inputdata.dish,
        qnty:inputdata.qnty,
        rating: inputdata.rating,
        image: inputdata.image,
        review: inputdata.review

      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const SubmitProductData = async (e) => {
    e.preventDefault();
    if (!inputdata.resturant || !inputdata.resturant.length) {
      setResturanterror("Name is required");
      return false
    } else {
      setResturanterror("");
    }
    if (!inputdata.price) {
      setPriceError("Price is required");
      return false
    } else {
      setPriceError("")
    }
    if (!inputdata.dish || !inputdata.dish.length) {
      setProductError("Product name is required");
      return false
    } else {
      setProductError("")
    }
    if (!inputdata.qnty) {
      setQuantityError("Quantity is required");
      return false;
    } else {
      setQuantityError("")
    }
    if (!inputdata.rating || !inputdata.rating.length) {
      setRatingError("Rating is required");
      return false
    } else {
      setRatingError("")
    }
    if (!inputdata.image || !inputdata.image) {
      setImageError("Image is required");
      return false;
    } else {
      setImageError("")
    }
    if (!inputdata.review || !inputdata.review) {
      setReveiwError("Reveiw is required");
      return false;
    } else {

      sendRequest()
      .then(() => navigate("/")).then(toast.success("successfully updated the product"))
    }
    return true

  }


  useEffect(() => {
    GetQuoteFun()
  }, [])


  return (

    <>

      <div className='bx'>

        <div className='sh'>
          <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '20px' }}>Update the Product</Typography>
          <div className='row'>
            <div className='f1'>
              <Typography className='tx' >Resturant Name:</Typography>
              <TextField error={resturanterror && resturanterror.length ? true : false} id="outlined-error" helperText={inputdata.resturant ? !inputdata.resturant : resturanterror} size="small" value={inputdata.resturant} onChange={setInputValue} name='resturant' placeholder='Enter Resturant Name' variant="outlined" className='same' />
            </div>
            <div className='f2'>
              <Typography className='tx'>Price:</Typography>
              <TextField error={pricerror && pricerror.length ? true : false} id="outlined-error" helperText={inputdata.price ? !inputdata.price : pricerror} size="small" value={inputdata.price} onChange={setInputValue} name='price' type='number' placeholder='Enter Price' variant="outlined" className='same' />
            </div>
          </div>

          <div className='row'>
            <div className='f3'>
              <Typography className='tx'>Product Name:</Typography>
              <TextField error={producterror && producterror.length ? true : false} id="outlined-error" helperText={producterror} size="small" value={inputdata.dish} onChange={setInputValue} name='dish' placeholder='Enter product name' la variant="outlined" className='same' />
            </div>
            <div className='f4'>
              <Typography className='tx'>Quantity:</Typography>
              <TextField error={quantityerror && quantityerror.length ? true : false} id="outlined-error" helperText={quantityerror} type='number' name='qnty' onChange={setInputValue} value={inputdata.qnty} placeholder='Enter quantity' size="small" variant="outlined" className='same' />
            </div>
          </div>

          <div className='row'>
            <div className='f5'>
              <Typography className='tx'>Rating:</Typography>
              <TextField error={ratingerror && ratingerror.length ? true : false} id="outlined-error" helperText={ratingerror} size="small" name='rating' onChange={setInputValue} value={inputdata.rating} placeholder='Enter Ratings' variant="outlined" className='same' />
            </div>
            <div className='f7'>
              <Typography className='tx'>Image:</Typography>
              <TextField error={imageerror && imageerror.length ? true : false} helperText={imageerror} id="outlined-error" name='image' value={inputdata.image} onChange={setInputValue} placeholder='Enter product image' size="small" variant="outlined" className='same' />
            </div>
          </div>

          <div className='f6'>
            <Typography className='tx'>Review:</Typography>
            <TextField error={reviewerror && reviewerror.length ? true : false} id="outlined-error" helperText={reviewerror} placeholder='Enter your feedbacks' onChange={setInputValue} name='review' value={inputdata.review} style={{ width: '640px' }} size="small" variant="outlined" className='same' />
          </div>

          <div className='row' style={{ width: '640px', display: 'flex', marginTop: '30px' }}>

            <Button onClick={SubmitProductData} className='btb' style={{
              backgroundColor: '#ff3333', color: 'white',
              marginLeft: '12px', display: 'flex', justifyContent: 'center', marginTop: '5px'
            }}
              variant="contained" >Update</Button>
          </div>

        </div>

      </div>
    </>
  )
}

export default UpdateCard
