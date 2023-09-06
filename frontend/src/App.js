import alanBtn from "@alan-ai/alan-sdk-web";
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

import AddProduct from "./Onlinestore/AddProduct";
import UpdateCard from "./Onlinestore/UpdateCard";
import Cards from "./components/Cards";
import CardDetails from "./components/CardDetails";
import OrderItem from "./Onlinestore/OrderItem";
import ViewCart from "./Onlinestore/ViewCart";
import CartItem from "./components/CartItem";
import Header from "./components/Header";


function App() {
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);

  useEffect(() => {
    setAlanAtom(
      alanBtn({
        key: '443debc3a9e2807fec25a5ebc34ae21b2e956eca572e1d8b807a3e2338fdd0dc/stage',
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

        {/*viraj route*/}
        {/* <Header/> */}
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
