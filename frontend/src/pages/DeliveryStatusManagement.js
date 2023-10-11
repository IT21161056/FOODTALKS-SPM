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
import Formtable from "../components/formDeliveryStatus";
import styled from "styled-components";

const DeliveryStatusManagement = () => {

    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        orderId: "",
        cusname: "",
        state: "",
    });
    const [formDataEdit, setFormDataEdit] = useState({
        userId: "",
        orderId: "",
        cusname: "",
        state: "",
        _id: "",
    });
    const [dataList, setDataList] = useState([]);
    console.log("check state array >>>", dataList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // State for the search query
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("all"); // Default to "all"

    const [totalDeliveries, setTotalDeliveries] = useState(0);
    const [totalProgressDeliveries, setTotalProgressDeliveries] = useState(0);
    const [totalNotProgressDeliveries, setTotalNotProgressDeliveries] = useState(0);

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
        const deliveriesStatus = await axios.get("http://localhost:8072/deliveryStatus/");
        setDataList(deliveriesStatus.data);
        console.log(deliveriesStatus.data)
    
        // const progressCount = deliveriesStatus.data.filter(
        //   (item) => item.state === "Deliver in Progress"
        // ).length;
        // const notProgresstCount = deliveriesStatus.data.filter(
        //   (item) => item.status === "Ready to Deliver"
        // ).length;
    
        // setTotalDeliveries(deliveriesStatus.data.length);
        // setTotalProgressDeliveries(progressCount);
        // setTotalNotProgressDeliveries(notProgresstCount);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = await axios.post(
          "http://localhost:8072/deliveryStatus/create",
          formData
        );
    
        if (data.data.success) {
          setAddSection(false);
          getFetchData();
          setFormData({
            userId: "",
            orderId: "",
            cusname: "",
            state: "",
          });
          showSuccessMessage("Record saved successfully!");
          setIsSubmitting(false);
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
          `http://localhost:8072/deliveryStatus/delete/${id}`
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
          "http://localhost:8072/deliveryStatus/update",
          formDataEdit
        );
        if (data.data.success) {
          getFetchData();
          setEditSection(false);
          showSuccessMessage("Record updated successfully!");
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
      const filteredData = []
      // dataList.filter((item) =>
      //   item.cusname.toLowerCase().includes(searchQuery.toLowerCase())
      // );

      const generatePDF = () => {
        const doc = new jsPDF();
    
        doc.setFontSize(14);
        doc.text("Delivery Person Management Report", 50, 20);
    
        // Add cards to the PDF
        const cards = [
          { title: "Total Delivery Persons", value: totalDeliveries },
          { title: "Total Present Persons", value: totalProgressDeliveries },
          { title: "Total Not Present Persons", value: totalProgressDeliveries },
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
       

        <Cards>
          <Card>
            <CardHeader>Total Delivery Persons</CardHeader>
            <p>{totalDeliveries}</p>
          </Card>
          <Card>
            <CardHeader>Total Present Persons</CardHeader>
            <p>{totalProgressDeliveries}</p>
          </Card>
          <Card>
            <CardHeader>Total Not Present Persons</CardHeader>
            <p>{totalNotProgressDeliveries}</p>
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
          <option value="Deliver in Progress">Progress Deliveries</option>
          <option value="Ready to Deliver">Not Progress Deliveries</option>
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
                  <TableHeadTableRowTableHead>User ID</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Order ID</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Customer Name
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Delivery Status
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
                      return item.state === selectedStatus;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e1) => (
                    <tr key={e1.id}>
                      <TableBodyTd>{e1.userId}</TableBodyTd>
                      <TableBodyTd>{e1.orderId}</TableBodyTd>
                      <TableBodyTd>{e1.cusname}</TableBodyTd>
                      <TableBodyTd>{e1.state}</TableBodyTd>
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
  )
}

const ContainerDiv = styled("div")`
  padding: 10px;
  /* background-color: red; */
  max-width: 1200px;
  /* margin: 50px auto; */
  margin: 25px auto;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const AddButton = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(238, 126, 56);
  color: white;
  padding: 24px 24px 24px 24px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
  }
`;

const BackButton = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(238, 126, 56);
  color: white;
  padding: 24px 24px 24px 24px;
  margin-left: 50px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
    margin-top: 10px; // Add some top margin for spacing
  }
`;

const ContainerForTable = styled("div")`
  margin-top: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const TableHeadTr = styled("tr")`
  /* background-color: rgb(238, 126, 56); */
  border: 1px solid rgb(238, 126, 56);
`;

const TableHeadTableRowTableHead = styled("th")`
  min-width: 200px;
  border: 1px solid rgb(238, 126, 56);
  padding: 15px;
  border-radius: 0;
  font-weight: 18px;
  color: rgb(238, 126, 56);
  justify-content: center;
  align-content: center;
`;

const TableBodyTd = styled("td")`
  min-width: 200px;
  padding: 7px;
  border: 1px solid rgb(238, 126, 56);
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
  border: 1px solid rgb(238, 126, 56);
`;

const BtnDelete = styled("button")`
  font-size: 16px;
  padding: 5px 10px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(238, 126, 56);
`;

const SearchInput = styled("input")`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: width 0.3s ease-in-out; /* Add smooth transition for width changes */
  margin-top: 20px;
  width: 200px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Take up the full width on smaller screens
  }
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

  // Media query for smaller screens
  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
  }
`;

const Cards = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    flex-direction: column; // Stack cards vertically on smaller screens
  }
`;

const Card = styled("div")`
  width: calc(33.33% - 10px); /* Adjust the width and spacing as needed */
  padding: 10px;
  border: 1px solid rgb(238, 126, 56);
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Take up the full width on smaller screens
    margin-bottom: 10px;
  }
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

export default DeliveryStatusManagement
