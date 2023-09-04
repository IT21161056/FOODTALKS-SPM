import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DLT, REMOVE } from '../redux/actions/action';
import { IconButton } from '@mui/material';

const CardDetails = () => {

  const [data, setData] = useState([]);
  console.log(data);

  const { id } = useParams();
  //console.log(id)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts)
  //console.log(getdata.length)

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    })
    setData(comparedata)
  }

  useEffect(() => {
    compare();
  }, [id])

  const send = (e) => {
    dispatch(ADD(e));
    console.log(e)
  }

  const dlt = (id) => {
    dispatch(DLT(id))
    navigate("/");
  }

  const remove = (item) => {
    dispatch(REMOVE(item))
  }

  return (
    <>
      <div className='container mt-2'>
        <h2 className='text-center'>Items details page</h2>
        <section className='container mt-3'>
          <div className='itemsdetails'>
            {
              data.map((ele) => {

                return (

                  <>
                    <div className='items_img'>
                      <img src={ele.image} />
                    </div>
                    <div className='details'>
                      <Table>
                        <tr>
                          <td>
                            <p> <strong>Resturant</strong> : {ele.resturant} </p>
                            <p> <strong>Price</strong>     : ${ele.price} </p>
                            <p> <strong>Dishes</strong>    : {ele.dish} </p>
                            <p> <strong>Total</strong>     : ${ele.price * ele.qnty} </p>
                            <div className='mt-5 d-flex justify-content-between 
                                            align-items-center' style={{width:100,cursor:"pointer",background:'#e0ebeb',color:'#111'}}>
                                              <span style={{fontSize:'25px',marginLeft:'8px'}}  onClick={ ele.qnty <= 1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                                              <span style={{fontSize:'20px'}}>{ele.qnty}</span>
                                              <span style={{fontSize:'25px',marginRight:'8px'}} onClick={()=>send(ele)} >+</span>
                                            </div>
                          </td>
                          <td style={{ paddingLeft: '20px' }} >
                            <p><strong>Rating :</strong> <span style={{ backgroundColor: '#47d147', padding: '5px' }}> {ele.rating}⭐ </span>  </p>
                            <p><strong>Order reveiw :</strong> <span > {ele.somedata}  </span>  </p>
                            <p><strong>Remove</strong> <span style={{ color: 'red' }}> {<IconButton sx={{color:"red"}} onClick={()=> dlt(ele.id)}><DeleteIcon /></IconButton>} </span>  </p>
                          </td>
                        </tr>
                      </Table>
                    </div>

                  </>
                )
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardDetails
