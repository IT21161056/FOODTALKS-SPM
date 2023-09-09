import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Registraion from "../pages/Registration";
import Home from "../pages/Home";

//viraj imports
import CardDetails from "../components/CardDetails";
import Cards from "../components/Cards";
import CartItem from "../components/CartItem";
import AddProduct from "../pages/AddProduct";
import OrderItem from "../pages/OrderItem";
import UpdateCard from "../pages/UpdateCard";
import ViewCart from "../pages/ViewCart";
import OrderCheckout from "../pages/OrderCheckout";

import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";

export default function FoodTalksRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* Anoj home routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Registraion />} />

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
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        {/* Anoj dashboard routes */}
        <Route path="/dashboard/users" element={<Customers />} />

        {/* viraj routes*/}
        <Route path="/dashboard/addnew" element={<AddProduct />}></Route>
      </Route>
    </Routes>
  );
}
