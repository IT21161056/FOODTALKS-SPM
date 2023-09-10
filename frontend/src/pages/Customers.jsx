import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography } from "@mui/material";

const columns = [
  { id: "fname", label: "First Name", minWidth: 170 },
  { id: "lname", label: "Last Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "options",
    label: "Options",
    align: "right",
  },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Customers() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchUsers = async (event) => {
      setIsLoading(true);
      axios
        .get("http://localhost:8072/users")
        .then((res) => {
          setIsLoading(false);
          setCustomers(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchUsers();
  }, []);

  const deleteCustomers = (userID) => {
    axios
      .delete("http://localhost:8072/users/" + userID)
      .then(() => {
        setIsLoading(false);
        const newCustomers = customers.filter((el) => el._id != userID);
        setCustomers(newCustomers);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <TableContainer sx={{ maxHeight: "60vh", padding: 1 }}>
      <Typography mb={2} sx={{ fontWeight: 600, fontSize: 20, color: "black" }}>
        Customer List
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
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        children={<DeleteForeverIcon />}
                        onClick={() => deleteCustomers(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </TableContainer>
  );
}
