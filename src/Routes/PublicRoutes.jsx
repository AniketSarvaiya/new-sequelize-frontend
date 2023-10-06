import { Box } from "@mui/material";
import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function PublicRoutes({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // const checkAuth = (token) => {
  //   try {
  //     if (token) return true;
  //     else return false;
  //   } catch (error) {
  //     localStorage.clear();
  //     return false;
  //   }
  // };
  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   const decode = jwt_decode(token);
    //   if (decode?.isUser === "user") navigate("/home");
    //   else navigate("/student");
    // }
  }, []);

  return <Box>{children}</Box>;
}

export default PublicRoutes;
