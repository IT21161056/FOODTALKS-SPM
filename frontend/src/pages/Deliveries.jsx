import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeliveryStatusTable from "./DeliveryStatusTable";

const columns = [
  { id: "customerName", label: "Customer Name" },
  { id: "mobileNumber", label: "Contact Number" },
  {
    id: "city",
    label: "City",
  },
  {
    id: "deliverLocation",
    label: "Delivery Location",
  },
  {
    id: "deliverDate",
    label: "Delivery Date",
  },
  {
    id: "totalAmount",
    label: "Amount",
  },
  {
    id: "action",
    label: "Options",
    align: "right",
  },
];

const Deliveries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(0);
  const [deliveryGuys, setDeliveryGuys] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [assignedDvPerson, setDvPerson] = useState("");
  const [open, setOpen] = React.useState(false);
  const [delivery, setDelivery] = useState({
    deliverPerson: "",
    orderId: "",
    cusname: "",
    state: "",
    date: "",
  });
  const [deliveryStatus, setDeliveryStatus] = useState("readytodeliver");
  const [deliveryStatusData, setDeliveryStatusData] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setDvPerson("");
  };

  const getOrderId = (order) => {
    setOpen(true);
    setDelivery({
      deliverPerson: "",
      orderId: order._id,
      cusname: order.customerName,
      state: "readytodeliver",
      date: new Date(),
    });
  };

  const submit = () => {
    const newDelivery = {
      ...delivery,
      deliverPerson: assignedDvPerson,
      state: deliveryStatus,
    };
    setDeliveryStatusData([...deliveryStatusData, newDelivery]);

    axios
      .post("http://localhost:8072/deliveryStatus/create", newDelivery)
      .then((res) => {
        setIsLoading(false);
        setDvPerson("");
        setOpen(false);
        setDelivery({
          deliverPerson: "",
          orderId: "",
          cusname: "",
          state: "",
          date: "",
        });

        // Add the new delivery data to the table
        setDeliveryStatusData((prevData) => [...prevData, newDelivery]);

        toast.success("Successfully added the data");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8072/order/")
      .then((res) => {
        setIsLoading(false);
        setOrders(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8072/delivery/")
      .then((res) => {
        setIsLoading(false);
        setDeliveryGuys(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TableContainer sx={{ maxHeight: "60vh", padding: 1 }}>
      <Typography mb={2} sx={{ fontWeight: 600, fontSize: 20, color: "black" }}>
        Orders
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column?.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.deliverLocation}</TableCell>
                    <TableCell>{row.deliverDate}</TableCell>
                    <TableCell>{row.totalAmount}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => getOrderId(row)}>
                        <SettingsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>


      {deliveryStatusData.length > 0 && (
        <DeliveryStatusTable data={deliveryStatusData} />
      )}



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "grid", placeItems: "center" }}
      >
        <Box
          sx={{
            height: "auto",
            width: 500,
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Assign a Delivery person
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedDvPerson}
              label="Assign a Delivery person"
              onChange={(v) => setDvPerson(v.target.value)}
            >
              {deliveryGuys.map((d) => (
                <MenuItem value={d.name}>{d.name}</MenuItem>
              ))}
            </Select>
            <br></br>
            <Select
              labelId="delivery-status-label"
              id="delivery-status-select"
              value={deliveryStatus}
              label="Delivery Status"
              onChange={(v) => setDeliveryStatus(v.target.value)}
            >
              <MenuItem value="readytodeliver">Ready to deliver</MenuItem>
              <MenuItem value="pending">Deliver in Progress</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
            <br></br>
            <TextField
              name="cusname"
              required
              fullWidth
              size="small"
              id="cusname"
              label="Customer Name"
              autoFocus
              value={delivery.cusname}
              disabled
            />
            <Button onClick={submit}>Save</Button>
          </FormControl>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default Deliveries;
