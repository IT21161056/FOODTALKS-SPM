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
import styled from "styled-components";

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

  const showSuccessMessage = (message) => {
    toast.success(
      <SuccessMessage>
        <SuccessIcon className="material-icons">check_circle</SuccessIcon>
        {message}
      </SuccessMessage>,
      { autoClose: 2000 }
    );
  };

  const getFetchData = async () => {
    const deliveries = await axios.get("http://localhost:8072/delivery/");
    setDataList(deliveries.data);

    const presentCount = deliveries.data.filter(
      (item) => item.status === "Yes"
    ).length;
    const notPresentCount = deliveries.data.filter(
      (item) => item.status === "No"
    ).length;

    setTotalDeliveryPersons(deliveries.data.length);
    setTotalPresentPersons(presentCount);
    setTotalNotPresentPersons(notPresentCount);
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
      getFetchData();
      setFormData({
        name: "",
        email: "",
        area: "",
        mobile: "",
        status: "",
      });
      showSuccessMessage("Record saved successfully!");
      // toast.success("Record saved successfully!", { autoClose: 2000 });
      setIsSubmitting(false);
      //setAddSection(false);
    }
    const form = e.target;

    if (form.checkValidity()) {
      // Form is valid, proceed with submission
      // You can submit the form data or perform other actions here
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
      //toast.success("Record deleted successfully!", { autoClose: 2000 });
      showSuccessMessage("Record deleted successfully!");
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
      showSuccessMessage("Record updated successfully!");
      //toast.success("Record updated successfully!", { autoClose: 2000 });
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <center>
        <h1>Delivery Person Management</h1>
      </center>
      <ContainerDiv>
        <AddButton onClick={() => setAddSection(true)}>
          Add Delivery Person
        </AddButton>
        <BackButton onClick={generatePDF}>Generate PDF Report</BackButton>

        <Cards>
          <Card>
            <CardHeader>Total Delivery Persons</CardHeader>
            <p>{totalDeliveryPersons}</p>
          </Card>
          <Card>
            <CardHeader>Total Present Persons</CardHeader>
            <p>{totalPresentPersons}</p>
          </Card>
          <Card>
            <CardHeader>Total Not Present Persons</CardHeader>
            <p>{totalNotPresentPersons}</p>
          </Card>
        </Cards>

        <br />

        {/* Search bar */}

        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Status filter dropdown */}
        <SelectList
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Yes">Present</option>
          <option value="No">Not Present</option>
        </SelectList>

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

        <ContainerForTable>
          <TableContainer component={Paper}>
            <table>
              <thead>
                <TableHeadTr>
                  <TableHeadTableRowTableHead>Name</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Email</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Covering Area
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Mobile
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Is present today?
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Actions
                  </TableHeadTableRowTableHead>
                </TableHeadTr>
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
                      <TableBodyTd>{e1.name}</TableBodyTd>
                      <TableBodyTd>{e1.email}</TableBodyTd>
                      <TableBodyTd>{e1.area}</TableBodyTd>
                      <TableBodyTd>{e1.mobile}</TableBodyTd>
                      <TableBodyTd>{e1.status}</TableBodyTd>
                      <TableBodyTd>
                        <BtnEdit onClick={() => handleEdit(e1)}>
                          <EditIcon />
                        </BtnEdit>
                        <BtnDelete onClick={() => handleDelete(e1._id)}>
                          <DeleteIcon />
                        </BtnDelete>
                      </TableBodyTd>
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
        </ContainerForTable>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled("div")`
  padding: 10px;
  /* background-color: red; */
  max-width: 1200px;
  /* margin: 50px auto; */
  margin: 25px auto;
`;
const AddButton = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: #194064;
  color: white;
  padding: 24px 24px 24px 24px;
`;

const BackButton = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: #194064;
  color: white;
  padding: 24px 24px 24px 24px;
  margin-left: 50px;
`;

const ContainerForTable = styled("div")`
  margin-top: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const TableHeadTr = styled("tr")`
  background-color: #f0eaea;
`;

const TableHeadTableRowTableHead = styled("th")`
  min-width: 200px;
  background-color: royalblue;
  padding: 15px;
  border-radius: 5px;
  font-weight: 18px;
  color: #fff;
  justify-content: center;
  align-content: center;
`;

const TableBodyTd = styled("td")`
  min-width: 200px;
  padding: 7px;
  border: 1px solid royalblue;
  border-radius: 5px;
  justify-content: center;
  align-content: center;
`;

const BtnEdit = styled("button")`
  font-size: 16px;
  padding: 5px 10px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`;

const BtnDelete = styled("button")`
  font-size: 16px;
  padding: 5px 10px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`;

const SearchInput = styled("input")`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: width 0.3s ease-in-out; /* Add smooth transition for width changes */
  margin-top: 20px;
  width: 200px;
`;

const SelectList = styled("select")`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: width 0.3s ease-in-out; /* Add smooth transition for width changes */
  margin-top: 20px;
  margin-left: 50px;
  width: 200px;
`;

const Cards = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Card = styled("div")`
  width: calc(33.33% - 10px); /* Adjust the width and spacing as needed */
  padding: 10px;
  border: 1px solid royalblue;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled("h3")`
  font-size: 18px;
  margin-bottom: 10px;
`;

const SuccessMessage = styled("div")`
  display: flex;
  align-items: center;
  color: #28a745;
`;

const SuccessIcon = styled("span")`
  font-size: 24px;
  margin-right: 10px;
`;

export default DeliveryManagement;
