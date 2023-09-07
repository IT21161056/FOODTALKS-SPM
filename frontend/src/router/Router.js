import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Registraion from "../pages/Registration";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

export default function Router() {
  const location = useLocation();

  return <div>Router</div>;
}
