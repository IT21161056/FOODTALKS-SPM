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
import ManageMenu from "../pages/ManageMenu";

//pasindu imports
import OrderCheckout from "../pages/OrderCheckout";
import AllOrders from "../pages/AllOrders";
import UpdateOrder from "../pages/UpdateOrder";
import Main from "../pages/Main";

import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import DeliveryManagement from "../pages/DeliveryManagement";
import DeliveryStatus from "../pages/DeliveryStatus";
import DeliveryStatusManagement from "../pages/DeliveryStatusManagement";

export default function FoodTalksRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* Anoj home routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Registraion />} />
        <Route path="/profile" element={<Profile />} />

        {/* viraj routes */}
        <Route path="/addnew" element={<AddProduct />}></Route>
        <Route path="/update/:id" element={<UpdateCard />}></Route>
        <Route path="/menu" element={<Cards />} />
        <Route path="/cart/:id" element={<CardDetails />} />
        <Route path="/order/:id" element={<OrderItem />} />
        <Route path="/view/:id" element={<ViewCart />} />
        <Route path="/cartitem" element={<CartItem />} />

        {/* pasindu routes */}
        <Route path="/order" exact element={<OrderCheckout />} />
        <Route path="/main" exact element={<Main />} />
      </Route>

      {/* Harini routes */}
      <Route path="/manageDeliveryStatus" exact element={<DeliveryStatus />} />

      <Route path="/dashboard" element={<Dashboard />}>
        {/* Anoj dashboard routes */}
        <Route path="/dashboard/users" element={<Customers />} />

        {/* viraj routes*/}
        <Route path="/dashboard/addnew" element={<AddProduct />}></Route>

        <Route path="/dashboard/manageMenu" element={<ManageMenu />}></Route>

        {/* Pasindu dashboard rotes */}
        <Route path="/dashboard/allOrders" element={<AllOrders />} />
        <Route path="/dashboard/updateOrder/:id" element={<UpdateOrder />} />

        {/* harini routes */}
        <Route
          path="/dashboard/manageDelivery"
          element={<DeliveryManagement />}
        ></Route>
        <Route
          path="/dashboard/deliveryStatus"
          element={<DeliveryStatusManagement />}
        ></Route>
      </Route>
    </Routes>
  );
}
