import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getAdmin, getUser } from "../store/actions/userActions";
import Page404 from "../pages/Page404";

function PrivateRoutes({ children, role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userAuth.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = (token, user, role) => {
    try {
      if (token && role == user?.isUser) {
        return token;
      }
    } catch (error) {
      localStorage.clear();
      navigate("/");
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decode = jwt_decode(token);
      console.log("decodev => ", decode);

      const config = {
        headers: {
          "X-auth-token": `${token}`,
        },
      };
      if (decode?.isUser === "admin") {
        const admin = dispatch(getAdmin(config));
        console.log("admin --->", admin);
      } else {
        const user = dispatch(getUser(config));
        console.log(user);
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const val = checkAuth(token, userdata, role);
    console.log("val => ", token, userdata, Boolean(val), role);
    setIsAuthenticated(Boolean(val));
  }, [userdata]);

  console.log("is AUthenticated => ", isAuthenticated);

  return isAuthenticated ? (
    // return isAuth ? (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  ) : (
    // <h1>Page Not Found</h1>
    <Page404 />
  );
}

export default PrivateRoutes;
