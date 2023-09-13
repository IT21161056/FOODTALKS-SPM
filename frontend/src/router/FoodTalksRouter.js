import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Registraion from "../pages/Registration";
import Profile from "../pages/Profile";

//viraj imports
import CardDetails from "../components/CardDetails";
import Cards from "../components/Cards";
import CartItem from "../components/CartItem";
import AddProduct from "../pages/AddProduct";
import OrderItem from "../pages/OrderItem";
import UpdateCard from "../pages/UpdateCard";
import ViewCart from "../pages/ViewCart";

//pasindu imports
import OrderCheckout from "../pages/OrderCheckout";
import AllOrders from "../pages/AllOrders";
import UpdateOrder from "../pages/UpdateOrder";

export default function FoodTalksRouter() {
  return (
    <Routes>
      <Route path="/" element={<Registraion />} />
      <Route path="/login" element={<Login />} />

      {/* viraj routes */}
      <Route path="/addnew" element={<AddProduct />}></Route>
      <Route path="/update/:id" element={<UpdateCard />}></Route>
      <Route path="/menu" element={<Cards />} />
      <Route path="/cart/:id" element={<CardDetails />} />
      <Route path="/order/:id" element={<OrderItem />} />
      <Route path="/view/:id" element={<ViewCart />} />
      <Route path="/cartitem" element={<CartItem />} />

      {/* pasindu routes */}
      <Route path="/orderCheckOut" exact element={<OrderCheckout />} />
      <Route path="/dashBoard/allOrders" exact element={<AllOrders />} />
      <Route path="/dashBoard/updateOrder" exact element={<UpdateOrder />} />

      {/* viraj routes*/}
      <Route path="/addnew" element={<AddProduct />}></Route>
    </Routes>
  );
}
