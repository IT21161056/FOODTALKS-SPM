import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import FoodTalksRouter from "../router/FoodTalksRouter";

import Dashboard from "../pages/Dashboard";
import NavBar from "../pages/NavBar";

export default function Router() {
  const location = useLocation();

  const showAdminSide = location.pathname === "/dashboard";
  return (
    <>
      {showAdminSide ? <Dashboard /> : <NavBar />}
      <FoodTalksRouter />
    </>
  );
}
