import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { order } from "@service";
import { OrderModal } from "@modal";
import editImg from "./../../../assets/edit.svg";
import deleteImg from "./../../../assets/delete.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionButton = styled("img")(({ theme }) => ({
  cursor: "pointer",
  margin: theme.spacing(0, 1),
  "&:hover": {
    opacity: 0.8,
  },
}));

const CustomizedTables = ({ data }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <OrderModal item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T / R</StyledTableCell>
              <StyledTableCell align="center">Client Full Name</StyledTableCell>
              <StyledTableCell align="center">
                Client Phone Number
              </StyledTableCell>
              <StyledTableCell align="center">Service id</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionButton
                    src={editImg}
                    alt="Edit"
                    onClick={() => editItem(item)}
                  />
                  <ActionButton
                    src={deleteImg}
                    alt="Delete"
                    onClick={() => deleteItem(item.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
