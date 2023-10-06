import axios from "axios";
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL,
} from "../constants/BookConstant";
import { AssistWalker } from "@mui/icons-material";

export const insertBook = (formValues) => async (dispatch) => {
  try {
    debugger;
    // const { title, auther, description, isbn } = formValues;
    // const { bookimage } = formValues;
    // console.log("---------------", bookimage);
    dispatch({ type: ADD_BOOK_REQUEST });
    const book = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/book/add`,
      formValues,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(book);
    dispatch({ type: ADD_BOOK_SUCCESS, payload: book.data });
    return book.data;
  } catch (error) {
    dispatch({
      type: ADD_BOOK_FAIL,
      payload:
        error.data || error.response.data.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};

export const getAllBooks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BOOKS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/book/getallbooks`
    );
    console.log(data.books);
    dispatch({ type: GET_ALL_BOOKS_SUCCESS, payload: data.books });
    return data.books;
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKS_FAIL,
      payload:
        error.data || error.response.data.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};
