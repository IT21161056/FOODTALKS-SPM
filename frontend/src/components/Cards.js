import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'
import Dropdown from 'react-bootstrap/Dropdown';
// import { useDispatch } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import { ADD } from '../redux/actions/action'
import { alanAtom, command, data } from "../atom/alanAtom"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';

import 'bootstrap/dist/css/bootstrap.min.css';

const Cards = () => {


  const [message, setMessage] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newValue, setValue] = useAtom(data);
  
  const [cardData, setCardData] = useState([]);

  useEffect(() => {

    if (message == 'menu') {
      for (let i = 0; i < cardData.length; i++) {

        if (newAlanAtom) {
          newAlanAtom.playText(`${cardData[i].dish}` + 'price is' + `${cardData[i].price}` + `rupees`)
        }

      }
    } else if (message == 'noodles') {
      window.open(`http://localhost:3000/order/64dd8b78c40d567c3883a80c`)
    } else if (message == 'order_burger') {
      window.open(`http://localhost:3000/order/64d3c75180485394970aba0b`)
    } else if (message == 'open_cart') {
      newAlanAtom.playText('Opening the cart')
      window.open('http://localhost:3000/cartitem')
    } else if (message == 'chicken_burger') {
       addToCart(cardData[1])
    }else if(message == 'chicken_rice'){
        addToCart(cardData[0])
    }else if(message == 'chicken_noodles'){
        addToCart(cardData[2])
    }


  }, [message])

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

  const sendRequest = async () => {

    const res = await axios.get("http://localhost:8072/cart/").catch((err) => console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest().then((data) => setCardData(data))

  }, [])

  //delete logic implemented
  const deletequotation = async (id) => {
    try {
      await axios.delete(`http://localhost:8072/cart/delete/${id}`);
      const newdata = cardData.filter((el) => el._id !== id); 
      setCardData(newdata);
    } catch (error) {
      console.error(error);
    }

  }

  const [cartItems, setCartItems] = useState([]);


  const addToCart = (element) => {

    if (sessionStorage.getItem("cartItems") == null) {

      var cartItems = []
      cartItems.push(element);
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success('Item Added!', {
        autoClose: 100,
        position: "top-center",
      })

    } else {

      var localItems = []

      localItems = JSON.parse(sessionStorage.getItem("cartItems"));

      let checkedItems = localItems.filter(item => {
        if (item._id != element._id) {
          return item;
        }
        toast.error('Item already Added!', {
          autoClose: 100,
          position: "top-center",
        })
      })

      checkedItems.push(element)
      sessionStorage.setItem("cartItems", JSON.stringify(checkedItems));

    }

  };


  return (
    <div className='container mt-3'>
      <h2 className='text-center'>Today Menu</h2>
      <div className='searchcomponent'>
        <input type='text' placeholder='Seacrh any food here' className='search' />
        <button name='Search' value="Search" style={{ backgroundColor: '#1a75ff' }} className='btnsearch'>Search</button>
        <Link to="/addnew">
          <Button name='Add product' className='addbtn'>+ Add Product</Button>
        </Link>
      </div>
      <div style={{ position: 'absolute', top: '122px', display: 'flex', marginLeft: '-80px' }}>
        <Button variant='success' onClick={generatePDF} style={{ backgroundColor: 'green', margin: '20px' }}>Generate report</Button>
      </div>


      <div className='ct'>
        {
          cardData.map((element, id) => {
            return (
              <>
                <Card className='bh' style={{ width: '18rem', mt: '40px', border: 'none' }}  >
                  <Card.Img variant="top" src={element.image} style={{ height: "15rem" }} />
                  <div style={{ marginLeft: '20px', position: 'absolute', top: '10px', marginLeft: '245px', backgroundColor: 'none' }}>
                    <Dropdown >
                      <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                      </Dropdown.Toggle>
                      <Dropdown.Menu>

                        <Dropdown.Item>
                          <NavLink to={`/view/${element._id}`} className="text-decoration-none">
                            <RemoveRedEyeIcon style={{ color: "green " }}></RemoveRedEyeIcon><span>View</span>
                          </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Item >
                          <NavLink to={`/update/${element._id}`} className="text-decoration-none">
                            <ModeEditIcon style={{ color: "#9900cc" }}></ModeEditIcon><span>Update</span>
                          </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item >
                          <div onClick={() => { deletequotation(element._id); toast.error("successfully deleted the product") }} >
                            <DeleteIcon style={{ color: "red" }}></DeleteIcon><span>Delete</span>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Card.Body>
                    <Card.Title>{element.dish}</Card.Title>
                    <Card.Text style={{ fontSize: '17px', fontWeight: '2rem' }}>
                      Price : Rs.{element.price}
                    </Card.Text>
                    <Button variant="primary" style={{ backgroundColor: '#1a75ff' }} onClick={() => addToCart(element)} >
                      Add to Cart</Button>
                    <Button variant="primary" style={{ marginLeft: '55px', backgroundColor: '#1a1aff', border: 'none' }} href={`order/${element._id}`} >
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
