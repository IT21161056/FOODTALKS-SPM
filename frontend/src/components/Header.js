import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { DLT } from '../redux/actions/action';

const Header = () => {

    const getdata = useSelector((state) => state.cartreducer.carts)
    console.log(getdata.length)

    const [price, setPrice] = useState(0);
    console.log(price);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        navigate("/addnew")
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total = () => {
        let price = 0;
        getdata.map((ele, k) => {
            price = ele.price * ele.qnty + price;
        })
        setPrice(price);
    }

    useEffect(() => {
        total()
    }, [total])

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container style={{ color: 'white',paddingTop:10,marginBottom:5}} >
                    <Link style={{textDecoration:'none'}} to='/'>Home</Link>
                    <Link to="/cartitem">
                        <Badge badgeContent={getdata.length} color="primary"
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </Link>
                </Container>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {

                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <thead>
                                            <tr>
                                                <th>Photo</th>
                                                <th><div style={{ marginLeft: '10px' }}>Restaurant Name</div></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getdata.map((e) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td >
                                                                    <NavLink to={`cart/${e.id}`} onClick={handleClose} >
                                                                        <img src={e.image} style={{ width: '6rem', height: '5rem', marginTop: '-20px' }} alt="food" />
                                                                    </NavLink>
                                                                </td>
                                                                <td >
                                                                    <div style={{ marginLeft: '10px' }}>
                                                                        <small>{e.resturant}</small><br></br>
                                                                        <small>price <b>${e.price}</b></small><br></br>
                                                                        <small>Quantity <b>{e.qnty}</b></small><br></br>
                                                                        <small>
                                                                            <IconButton sx={{ color: "red" }} onClick={() => dlt(e.id)} >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </small>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                            <p className='text-center'>Total: <b>${price}</b></p>

                                        </tbody>
                                    </thead>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                                <IconButton onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer", color: 'black' }}><CloseIcon /></IconButton>
                                <p style={{ fontSize: 22 }}>Your carts is empty</p>
                                <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                            </div>

                    }
                </Menu>

            </Navbar>
        </>
    )
}

export default Header
