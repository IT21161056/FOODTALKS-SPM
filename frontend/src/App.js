
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import CardDetails from './components/CardDetails';
import Cards from './components/Cards';
import AddProduct from './OnlineStore.js/AddProduct';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useAtom, atom } from "jotai";
import { command, alanAtom, value } from "./alanAtom";
import UpdateCard from './OnlineStore.js/UpdateCard';
import OrderItem from './OnlineStore.js/OrderItem';
import ViewCart from './OnlineStore.js/ViewCart';
import { useEffect } from 'react';
import CartItem from './components/CartItem';


function App() {

  const [message, setMessage] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newValue, setValue] = useAtom(value);

  let instance;//create instance of alan Button
  
  useEffect(() => {
    instance = alanBtn({
      key: '443debc3a9e2807fec25a5ebc34ae21b2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, value }) => {
        setMessage(command);
        setValue(value);
      },
    });
    setAlanAtom(instance);
  }, []);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/addnew" element={<AddProduct />}></Route>
        <Route path="/update/:id" element={<UpdateCard />}></Route>
        <Route  path='/'     element={<Cards/>}/>
        <Route  path='/cart/:id' element={<CardDetails/>}  />
        <Route  path='/order/:id' element={<OrderItem/>}  />
        <Route  path='/view/:id' element={<ViewCart/>}  />
        <Route path='/cartitem' element={<CartItem/>} />
      </Routes>
    </div>
  );
}

export default App;