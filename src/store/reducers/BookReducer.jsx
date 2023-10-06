import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  GET_ALL_BOOKS_FAIL,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_REQUEST,
} from "../constants/BookConstant";

export const bookReducer = (
  state = {
    isLoading: false,
    books: [],
    bookInserted: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        books: [],
        bookInserted: false,
        error: false,
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        books: [],
        bookInserted: true,
      };
    case ADD_BOOK_FAIL:
      return {
        ...state,
        isLoading: false,
        books: [],
        bookInserted: false,
        error: action.payload,
      };
    case GET_ALL_BOOKS_REQUEST:
      return {
        ...state,
        isLoading: true,
        books: [],
        error: null,
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload,
        error: null,
      };
    case GET_ALL_BOOKS_FAIL:
      return {
        ...state,
        isLoading: false,
        books: [],
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
