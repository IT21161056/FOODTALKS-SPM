import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { TextField, Typography } from '@mui/material';
import { addProduct } from '../context/ContextProvider';
import "./store.css"
import { toast } from 'react-toastify';

const AddProduct = () => {
  
  const navigate = useNavigate()
  
  //const {productData, setProductData} = useContext(addProduct);
  const [errors, setError] = useState(false);
 
  const [inputdata,setInputData] = useState({
    resturant:"",
    price:"",
    product:"",
    quantity:"",
    rating:"",
    image:"",
    review:""
  })

  const setInputValue = (e) => {
    const {name,value} = e.target;
    setInputData({...inputdata,[name]:value})
   
  }

  const [resturanterror,setResturanterror] = useState("");
  const [pricerror,setPriceError] = useState("");
  const [producterror,setProductError] = useState("");
  const [quantityerror,setQuantityError] = useState("");
  const [ratingerror,setRatingError] = useState("");
  const [imageerror,setImageError] = useState("");
  const [reviewerror,setReveiwError] = useState("");
  

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:8072/cart/add', {
        resturant: inputdata.resturant,
        price: inputdata.price,
        dish: inputdata.product,
        qnty: inputdata.quantity,
        rating: inputdata.rating,
        image: inputdata.image,
        review:inputdata.review
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const SubmitProductData = async(e) =>{
    e.preventDefault();
    if(!inputdata.resturant || !inputdata.resturant.length){
        setResturanterror("Name is required");
        return false
    }else{
        setResturanterror("");
    }
    if(!inputdata.price || !inputdata.price.length){
        setPriceError("Price is required");
        return false
    }else{
        setPriceError("")
    }
    if(!inputdata.product || !inputdata.product.length){
        setProductError("Product name is required");
        return false
    }else{
        setProductError("")
    }
    if(!inputdata.quantity || !inputdata.quantity.length){
        setQuantityError("Quantity is required");
        return false;
    }else{
        setQuantityError("")
    }
    if(!inputdata.rating  || !inputdata.rating.length){
        setRatingError("Rating is required");
        return false
    }else{
        setRatingError("")
    }
    if(!inputdata.image || !inputdata.image){
        setImageError("Image is required");
        return false;
    }else{
        setImageError("")
    }
    if(!inputdata.review || !inputdata.review){
        setReveiwError("Reveiw is required");
        return false;
    }else{
  
        sendRequest()
        .then(() => navigate("/menu")).then(toast.success("successfully added the product"))
        
    }
    return true
    
  }

  return (

    <>
    <div className='bx'>
 
   <div className='sh'>
   <Typography sx={{display:'flex',justifyContent:'center',fontSize:'1.8rem',marginBottom:'20px'}}>Add a New Product</Typography>
  <div className='row'>
    <div className='f1'>
      <Typography className='tx' >Resturant Name:</Typography>
      <TextField error={resturanterror && resturanterror.length ? true : false} id="outlined-error"   helperText={inputdata.resturant ? !inputdata.resturant : resturanterror}  size="small" value={inputdata.resturant} onChange={setInputValue} name='resturant' placeholder='Enter Resturant Name' variant="outlined" className='same' />
    </div>
    <div className='f2'>
      <Typography className='tx'>Price: Rs.</Typography>
      <TextField  error={pricerror && pricerror.length ? true : false}  id="outlined-error"  helperText={inputdata.price ? !inputdata.price : pricerror} size="small" value={inputdata.price} onChange={setInputValue} name='price' type='number' placeholder='Enter Price' variant="outlined" className='same' />
    </div>
  </div>

  <div className='row'>
    <div className='f3'>
      <Typography className='tx'>Product Name:</Typography>
      <TextField  error={producterror && producterror.length ? true : false}  id="outlined-error"  helperText={producterror}  size="small"  value={inputdata.product} onChange={setInputValue} name='product' placeholder='Enter product name' la variant="outlined" className='same' />
    </div>
    <div className='f4'>
      <Typography className='tx'>Quantity:</Typography>
      <TextField error={quantityerror && quantityerror.length ? true : false}  id="outlined-error"  helperText={quantityerror} type='number'  name='quantity' onChange={setInputValue}  value={inputdata.quantity} placeholder='Enter quantity' size="small"  variant="outlined" className='same' />
    </div>
  </div>

  <div className='row'>
    <div className='f5'>
      <Typography className='tx'>Rating:</Typography>
      <TextField error={ratingerror && ratingerror.length ? true : false}  id="outlined-error" helperText={ratingerror} size="small"  name='rating' onChange={setInputValue}  value={inputdata.rating} placeholder='Enter Ratings' variant="outlined" className='same' />
    </div>
    <div className='f7'>
      <Typography className='tx'>Image:</Typography>
      <TextField  error={imageerror && imageerror.length ? true : false}   helperText={imageerror} id="outlined-error"  name='image' value={inputdata.image} onChange={setInputValue} placeholder='Enter product image' size="small"  variant="outlined" className='same' />
    </div>
  </div>
    
    <div className='f6'>
      <Typography className='tx'>Review:</Typography>
      <TextField  error={reviewerror && reviewerror.length ? true : false}  id="outlined-error"  helperText={reviewerror} placeholder='Enter your feedbacks' onChange={setInputValue} name='review' value={inputdata.review}  style={{ width: '640px' }} size="small"  variant="outlined" className='same' />
    </div>

    <div className='row' style={{width:'640px',display:'flex',marginTop:'30px'}}>
    <Button  onClick={SubmitProductData} className='btb' style={{backgroundColor:'blue',color:'white',
    marginLeft:'12px',display:'flex',justifyContent:'center',marginTop:'5px'}} 
     variant="contained" >Add</Button>
    </div>
  
   </div>

    </div>
    </>
  )
}

export default AddProduct
