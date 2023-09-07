import React from "react";
import { useEffect, useState } from "react";
//import { useFormContext } from "react-hook-form";
import {useNavigate, useLocation, useParams} from "react-router-dom"
import { alanAtom, command, data } from "../atom/alanAtom";
import { useAtom } from "jotai";
//import DatePicker from "react-datepicker";
//import { Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function OrderCheckout () {

  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    var total = window.location.search;
    const urlParams = new URLSearchParams(total);
    const totalAmount = urlParams.get('total');
    setTotalAmount(totalAmount); // Set the total amount in the state
  }, []);


  const navigate = useNavigate();
  const pageName = useLocation();

  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [message, setMessage] = useAtom(command);
  const [newAlanData, setAlanData] = useAtom(data);
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliverLocation, setDeliverLocation] = useState("");
  const [deliverDate, setDeliverDate] = useState(new Date());
  

  const order = {
    fullName: fullName,
    mobileNumber: mobileNumber,
    deliverLocation: deliverLocation,
    deliverDate: deliverDate
  }

  console.log(fullName);
  console.log(mobileNumber);
  console.log(deliverLocation);
  console.log(deliverDate);

   useEffect(() => {
    if (message === "openForm") {
           navigate("/orderCheckout");
    }
    if (message === "gotoStep1") {
      navigate("/");
    }
    if (message === "getFullName") {
      setFullName(newAlanData);
    }
     if (message === "getMobileNumber") {
      setMobileNumber(newAlanData);
    }
    if (message === "getDeliverLocation") {
      setDeliverLocation(newAlanData);
    }
    if (message === "getDeliverDate") {
      setDeliverDate(newAlanData);
    }
    if (message === "submit") {
      console.log(order);
    }
  }, [message]);

  // function getOrderData() {
  //   newAlanAtom.activate();
  //   newAlanAtom.playText(
  //     "In here you can you can add your personal details to submit the order"
  //   );
  // }
  
  //  useEffect(() => {
  //   // getOrderData();
  //   newAlanAtom.activate();
  //   // newAlanAtom.callProjectApi("getOrderData");
  //   newAlanAtom.setVisualState({ path: pageName.pathname });
  // }, [pageName]);

  // const { register, handleSubmit, control, watch, formState: { errors } } = useFormContext();
  // const onSubmit = data => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form>

    <label>Full-Name : </label>
      <input
        type="text"
        // {...register("fullName", {
        //   required: "Required",
        // })}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      {/* {errors.customerName && <span style={{color:'red'}}>This field is required</span>} */}

      <label>Mobile No</label>
      <input 
        type="number"
      // {...register("phone", { 
      //   required: true })} 
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      {/* {errors.phone && <span style={{color:'red'}}>This field is required</span>} */}
      
      <label>Deliver Location</label>
      <input 
        type="text"
        // {...register("location", { 
        //   required: true })} 
        value={deliverLocation}
        onChange={(e) => setDeliverLocation(e.target.value)}
      />
      {/* {errors.location && <span style={{color:'red'}}>This field is required</span>}
     */}

      <label>Total Amount :</label>
      <input
      type="text"
        // {...register("amount", {
        //  required: true })} 
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
      />
      {/* {errors.amount && <span style={{color:'red'}}>This field is required</span>} */}
      

      {/* const formatDate = (date) => {
        return date ? date.toLocaleDateString() : '' // Check if date is not null before formatting
      }; */}

      {/* <label>Deliver Date: </label>
      <Controller
        control={control}
        name="fromDate"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
            onChange={(date) => {
              onChange(date); // send value to hook form
              setDeliverDate(date); // Update the selected date in the state
            }}
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
            minDate={new Date()}
          />
        )}
        
      /> */}

      <button type="submit" className="demo">Submit</button>
    </form>
  );
}