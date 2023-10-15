import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import jsPDF from 'jspdf';
import SettingsIcon from "@mui/icons-material/Settings";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

function preventDefault(event) {
  event.preventDefault();
}

const StyledLabel = styled("label")`
  margin-bottom: 20px;
  margin: 10px;
`;
export default function AllOrders() {
  const { id } = useParams();

  const [orders, setOrders] = React.useState([]);
  const [deliveryPerson, setDeliveryPerson] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // new
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [deliveryGuys, setDeliveryGuys] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [assignedDvPerson, setDvPerson] = useState("");

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

  const fetchOders = () => {
    axios
      .get("http://localhost:8072/order/")
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

    const addDelivery = () => {
      axios
        .post("http://localhost:8072/deliveryStatus/add", newDelivery)
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

      axios
        .put(
          "http://localhost:8072/order/updateOrderStatus/" + newDelivery.orderId
        )
        .then((res) => {
          fetchOders();
        });
    };

    addDelivery();
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

  // new end

  const employeeId = useParams();
  const employeeName = employee.name;

  const ordersArray = orders;
  console.log(ordersArray);

  {
    /* Fetch all the orders using useEffect*/
  }

  useEffect(() => {
    const fetchOrders = async (event) => {
      setIsLoading(true);

      axios
        .get("http://localhost:8072/order/")
        .then((res) => {
          setIsLoading(false);
          setOrders(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchOrders();

    function fetchEmployeeData() {
      axios
        .get("http://localhost:8072/delivery")
        .then((response) => {
          console.log(response.data);
          setEmployee(response.data);
        })
        .catch((error) => {
          alert("An error occures when fecthing employee data!!");
          console.log(error);
        });
    }
    fetchEmployeeData();
  }, []);

  const deleteOrder = async (orderId) => {
    axios
      .delete(`http://localhost:8072/order/delete/${orderId}`)
      .then(() => {
        setIsLoading(false);
        const newOrder = orders.filter((item) => item._id != orderId);
        setOrders(newOrder);
        alert("Order deleted succefully!!");
      })
      .catch((err) => {
        console.log("deletion order id " + orderId);
        alert(err);
      });
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((item) => {
    const { customerName, mobileNumber, city, totalAmount } = item;
    const mobileNumberAsString = mobileNumber.toString();
    const totalAmountAsString = totalAmount.toString();
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      customerName.toLowerCase().includes(lowerCaseQuery) ||
      mobileNumberAsString.includes(lowerCaseQuery) ||
      city.toLowerCase().includes(lowerCaseQuery) ||
      totalAmountAsString.toLowerCase().includes(lowerCaseQuery)
    );
  });

  function createAndDownLoadPdf() {
    axios
      .post("http://localhost:8072/orders_pdf/create-pdf", ordersArray)
      .then(() =>
        axios.get("http://localhost:8072/orders_pdf/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        console.log(res.data);
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "Order Report.pdf");
      });
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          mb={2}
          sx={{ fontWeight: 600, fontSize: 20, color: "primary", mt: 2, ml: 2 }}
        >
          Order List
        </Typography>
        <Button
          variant="contained"
          color="warning"
          sx={{ marginTop: "10px", marginLeft: "auto", mr: 2.5 }}
          onClick={createAndDownLoadPdf}
        >
          Generate Report
        </Button>
      </div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "white",
          width: "100%",
          margin: "auto",
          marginLeft: "10px",
        }}
      />
      {orders.length > 0 ? (
        <TableContainer sx={{ maxHeight: "70vh", padding: 1 }}>
          <Paper sx={{ width: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 150 }}>Customer Name</TableCell>
                  <TableCell sx={{ minWidth: 80 }}>Mobile Number</TableCell>
                  <TableCell sx={{ minWidth: 80 }}>City</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Deliver Location</TableCell>
                  <TableCell sx={{ minWidth: 70 }}>Deliver Date</TableCell>
                  <TableCell sx={{ minWidth: 90 }}>Deliver Person</TableCell>
                  <TableCell sx={{ minWidth: 80 }}>Total Amount</TableCell>
                  <TableCell sx={{ minWidth: 60 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders.map((item) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.mobileNumber}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.deliverLocation}</TableCell>
                      <TableCell>{item.deliverDate}</TableCell>
                      <TableCell>{item.deliveryPerson}</TableCell>
                      <TableCell>{item.totalAmount}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/updateOrder/${item._id}`)
                          }
                          sx={{ background: "primary" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => getOrderId(item)}>
                          <SettingsIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          children={<DeleteForeverIcon />}
                          onClick={() => deleteOrder(item._id)}
                        />
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
                <StyledLabel id="demo-simple-select-label">
                  Assign a Delivery person
                </StyledLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assignedDvPerson}
                  // label="Assign a Delivery person"
                  onChange={(v) => setDvPerson(v.target.value)}
                >
                  {deliveryGuys.map((d) => (
                    <MenuItem value={d.name}>{d.name}</MenuItem>
                  ))}
                </Select>

                <StyledLabel id="delivery_status_label">
                  Delivery status
                </StyledLabel>

                <Select
                  // labelId="delivery_status_label"
                  id="delivery_status"
                  value={deliveryStatus}
                  // label="Delivery status"
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
      ) : (
        "No orders"
      )}
</>
);
}