import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../store/actions/BookAction";
import BookImage from "../assets/defaultbook.png";

const tabStyles = {
  objectFit: "cover",
};

export default function BookTable() {
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  const { books, error, isLoading } = useSelector((state) => state.bookReducer);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  useEffect(() => {
    setBooksData(books);
    console.log("books", books);
  }, [books]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow sx={{ color: "#ffffff" }}>
              <TableCell sx={{ color: "#ffffff" }}>BookImage</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Isbn</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Title</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Auther</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Description</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksData.map((book) => {
              return (
                <TableRow>
                  <TableCell>
                    <img
                      style={tabStyles}
                      height={100}
                      width={75}
                      src={booksData ? book.bookimage : BookImage}
                    />
                  </TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.auther}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="warning">
                      Edit
                    </Button>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
