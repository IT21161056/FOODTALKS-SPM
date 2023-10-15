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
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeliveryStatusTable from "./DeliveryStatusTable";

const columns = [
  {
    id: "cusname",
    label: "Order owner Name",
  },
  {
    id: "deliverDate",
    label: "Delivery placed Date",
  },
  {
    id: "deliverPerson",
    label: "Delivery person",
  },
  {
    id: "state",
    label: "State",
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

  const [deliveries, setDeliveries] = useState([]);
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

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8072/deliveryStatus/")
      .then((res) => {
        setIsLoading(false);
        setDeliveries(res.data);
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
            {deliveries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell>{row.cusname}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.deliverPerson}</TableCell>
                    <TableCell>{row.state}</TableCell>
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
              Change delivery state
            </InputLabel>

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
            <Button onClick={""}>Save</Button>
          </FormControl>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default Deliveries;
