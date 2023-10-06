import axios from "axios";
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
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../constants/UserConstant";
import { type } from "@testing-library/user-event/dist/type";

export const userSignUp = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/register`,
      formValues
    );
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.data || error.response.data.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};

export const userSignIn = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/login`,
      formValues
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data.user });
    return data;
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};
export const getUser = (config) => async (dispatch) => {
  try {
    debugger;
    console.log(config);
    dispatch({ type: GET_USER_REQUEST });
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/getuser`,
      config
    );
    dispatch({ type: GET_USER_SUCCESS, payload: data.data.user });
    return data;
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};
export const updateProfilePic = (formValues) => async (dispatch) => {
  try {
    console.log(formValues);
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/update/profilepic`,
      formValues,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("profilepic =>", data);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
    return data;
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};
export const updateProfile = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/updateuser`,
      formValues
    );
    console.log("------------------ ", data);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
    return data.user;
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};

export const adminLogin = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
      formValues
    );
    console.log(data.data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data.user });
    return data.data;
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};

export const getAdmin = (token) => async (dispatch) => {
  try {
    console.log(token);
    dispatch({ type: GET_USER_REQUEST });
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/getadmin`,
      token
    );
    dispatch({ type: GET_USER_SUCCESS, payload: data.data.user });
    return data;
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};

export const updateAdminProfilePic = (formValues) => async (dispatch) => {
  try {
    console.log(formValues);
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admin/update/profilepic`,
      formValues,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("profilepic =>", data);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
    return data;
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error?.data || error?.response?.data?.message
          ? error.response.data.message
          : error.data,
    });
    return error;
  }
};
