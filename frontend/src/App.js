import alanBtn from "@alan-ai/alan-sdk-web";
import { ALAN_KEY } from "./config/alanKey";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { alanAtom, command, data } from "./atom/alanAtom";

//import pages
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";

//viraj imports
import CardDetails from "./components/CardDetails";
import Cards from "./components/Cards";
import CartItem from "./components/CartItem";
import Header from "./components/Header";
import AddProduct from "./Onlinestore/AddProduct";
import OrderItem from "./Onlinestore/OrderItem";
import UpdateCard from "./Onlinestore/UpdateCard";
import ViewCart from "./Onlinestore/ViewCart";

function App() {
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);

  useEffect(() => {
    setAlanAtom(
      alanBtn({
        key: ALAN_KEY,
        onCommand: ({ command, data }) => {
          console.log(command);
          console.log(data);

          setCommand(command);
          setData(data);
        },
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<Profile />} />

          {/* viraj routes*/}
        <Route path="/addnew" element={<AddProduct />}></Route>
        <Route path="/update/:id" element={<UpdateCard />}></Route>
        <Route  path='/menu'     element={<Cards/>}/>
        <Route  path='/cart/:id' element={<CardDetails/>}  />
        <Route  path='/order/:id' element={<OrderItem/>}  />
        <Route  path='/view/:id' element={<ViewCart/>}  />
        <Route path='/cartitem' element={<CartItem/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
