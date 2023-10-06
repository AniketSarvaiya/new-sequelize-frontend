import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
} from "../constants/UserConstant";

export const userReducer = (
  state = {
    isLoading: false,
    user: {},
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        user: {},
        error: null,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {},
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      console.log("payload-< ", action.payload);
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.payload,
      };
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };

    case USER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
