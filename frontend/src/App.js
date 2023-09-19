import alanBtn from "@alan-ai/alan-sdk-web";
import { ALAN_KEY } from "./config/alankey";
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

import Layout from "./layout/Layout";

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
      <Layout />
    </BrowserRouter>

  );
}

export default App;
