import React from "react";
import { useSelector } from "react-redux";
import Header from "../layouts/Header";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
const checkAuth = (token, user, role) => {
  try {
    if (token && role === "admin") {
      return token;
    }
  } catch (error) {
    return null;
  }
};

export default function AdminPrivateRoutes({ children, role }) {
  const { user } = useSelector((state) => state.userAuth);
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = checkAuth(token, user, role);
  if (!isAuthenticated) localStorage.clear();

  return isAuthenticated ? (
    // return isAuth ? (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  ) : (
    <Navigate to={"/"} />
  );
}
