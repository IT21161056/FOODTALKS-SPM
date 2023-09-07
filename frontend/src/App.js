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
import OrderCheckout from "./pages/OrderCheckout";
import Step1 from "./pages/Step1";

function App() {
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);

  useEffect(() => {
    setAlanAtom(
      alanBtn({
        key: "f302eaf49649acf3c6473b5423e04b5d2e956eca572e1d8b807a3e2338fdd0dc/stage",
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
        <Route path="/step1" exact element={<Step1 />} />
        <Route path="/orderCheckOut" exact element={<OrderCheckout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
