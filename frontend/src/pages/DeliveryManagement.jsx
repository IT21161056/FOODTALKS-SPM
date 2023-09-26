import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Paper, TableContainer } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./deliveryManagement.css";
import Formtable from "../components/formDelivery";
//import {StyleSheet} from 'react-native';

const DeliveryManagement = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    mobile: "",
    status: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    area: "",
    mobile: "",
    status: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);
  console.log("check state array >>>", dataList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("all"); // Default to "all"

  const [totalDeliveryPersons, setTotalDeliveryPersons] = useState(0);
  const [totalPresentPersons, setTotalPresentPersons] = useState(0);
  const [totalNotPresentPersons, setTotalNotPresentPersons] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const getFetchData = async () => {
    const deliveries = await axios.get("http://localhost:8072/delivery/");
    setDataList(deliveries.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = await axios.post(
      "http://localhost:8072/delivery/create",
      formData
    );

    if (data.data.success) {
      setAddSection(false);
      //alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email: "",
        area: "",
        mobile: "",
        status: "",
      });
      // toast.success("Record saved successfully!", { autoClose: 2000 });
      setIsSubmitting(false);
      setAddSection(false);
    }
    const form = e.target;

    if (form.checkValidity()) {
      // Form is valid, proceed with submission
      // You can submit the form data or perform other actions here
      // ...
    } else {
      // Form has validation errors, display error messages
      const invalidInputs = form.querySelectorAll(":invalid");
      invalidInputs.forEach((input) => {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = input.validationMessage;
      });
    }
  };

  useEffect(() => {
    getFetchData();
  }, [isSubmitting]);

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8072/delivery/delete/${id}`
    );
    if (data.data.success) {
      getFetchData();
      //alert(data.data.message);
      toast.success("Record deleted successfully!", { autoClose: 2000 });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put(
      "http://localhost:8072/delivery/update",
      formDataEdit
    );
    if (data.data.success) {
      getFetchData();
      //alert(data.data.message)
      setEditSection(false);
      toast.success("Record updated successfully!", { autoClose: 2000 });
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (e1) => {
    setFormDataEdit(e1);
    setEditSection(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter dataList based on the search query
  const filteredData = dataList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Delivery Person Management Report", 50, 20);

    // Add cards to the PDF
    const cards = [
      { title: "Total Delivery Persons", value: totalDeliveryPersons },
      { title: "Total Present Persons", value: totalPresentPersons },
      { title: "Total Not Present Persons", value: totalNotPresentPersons },
    ];
    cards.forEach((card, index) => {
      doc.setFontSize(12);
      doc.text(card.title, 20, 30 + index * 10);
      doc.text(card.value.toString(), 100, 30 + index * 10);
    });

    // Create an array for the table data
    const tableData = [];
    //tableData.push(["Name", "Email", "Covering Area", "Mobile", "Is present today"]);

    filteredData
      .filter((item) => {
        if (selectedStatus === "all") {
          return true;
        } else {
          return item.status === selectedStatus;
        }
      })
      .forEach((e1) => {
        tableData.push([e1.name, e1.email, e1.area, e1.mobile, e1.status]);
      });

    // Define the columns and rows for the table
    const columns = [
      "Name",
      "Email",
      "Covering Area",
      "Mobile",
      "Is present today",
    ];
    const rows = tableData;

    // Use the 'autoTable' function from the 'jspdf-autotable' library
    doc.autoTable({
      head: [columns],
      body: rows,
      startX: 10,
      startY: 60,
    });

    doc.save("delivery_person_report.pdf");
  };

  return (
    <>
      <ToastContainer />
      <center>
        <h1>Delivery Person Management</h1>
      </center>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add Delivery Person
        </button>
        <button className="btn backbtn" onClick={generatePDF}>
          Generate PDF Report
        </button>

        <div className="cards">
          <div className="card">
            <h3>Total Delivery Persons</h3>
            <p>{totalDeliveryPersons}</p>
          </div>
          <div className="card">
            <h3>Total Present Persons</h3>
            <p>{totalPresentPersons}</p>
          </div>
          <div className="card">
            <h3>Total Not Present Persons</h3>
            <p>{totalNotPresentPersons}</p>
          </div>
        </div>

        <br />

        {/* Search bar */}

        <input
          className="searchInput"
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Status filter dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Yes">Present</option>
          <option value="No">Not Present</option>
        </select>

        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
            isSubmitting={isSubmitting}
          />
        )}

        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <TableContainer component={Paper}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Covering Area</th>
                  <th>Mobile</th>
                  <th>Is present today?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter((item) => {
                    if (selectedStatus === "all") {
                      return true; // Show all items
                    } else {
                      return item.status === selectedStatus;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e1) => (
                    <tr key={e1.id}>
                      <td>{e1.name}</td>
                      <td>{e1.email}</td>
                      <td>{e1.area}</td>
                      <td>{e1.mobile}</td>
                      <td>{e1.status}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(e1)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(e1._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default DeliveryManagement;
