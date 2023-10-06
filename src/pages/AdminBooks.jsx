import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import React, { useEffect, useState } from "react";
import AddBookForm from "../components/AddBookForm";
import { ToastContainer } from "react-toastify";
import BookTable from "../components/BookTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../store/actions/BookAction";

function AdminBooks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState(null);
  const { books, error, isLoading } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    const bdata = dispatch(getAllBooks());
    setBooksData(books);
    console.log("----------------------", books, booksData);
  }, []);
  return (
    <>
      <ToastContainer />
      <Container>
        <Paper
          elevation={3}
          sx={{
            mt: "20px",
            padding: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={8}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <SearchSharpIcon sx={{ marginY: "auto", marginX: "10px" }} />
              <TextField
                label="Search"
                variant="standard"
                fullWidth
              ></TextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display={"flex"}
              justifyContent={"space-evenly"}
              spacing={2}
            >
              <Button variant="contained">
                {"search "}
                <SearchSharpIcon sx={{ marginX: "5px" }} />
              </Button>
              <Button variant="contained" onClick={handleOpen}>
                Add
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid
            container
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper sx={{ width: 900 }}>
              <Box sx={{ textAlign: "center", marginTop: "40px" }}>
                <Typography variant="h5">Add Book</Typography>
              </Box>
              <AddBookForm handleClose={handleClose} />
            </Paper>
          </Grid>
        </Modal>

        <BookTable />
      </Container>
    </>
  );
}

export default AdminBooks;
