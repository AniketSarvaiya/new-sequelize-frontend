import React from "react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import SignUpFotm from "../components/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
function SignUp() {
  return (
    <>
      <Grid
        container
        sx={{
          width: "100vw",
          height: "100vh",
          // backgroundColor: "grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={2}
      >
        <Paper
          elevation={4}
          sx={{
            width: "450px",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              mx: "auto",
              mt: "40px",
              mb: "20px",
            }}
          >
            <LockIcon />
          </Avatar>
          <Box sx={{ textAlign: "center" }} pb={2}>
            <Typography variant="h4"> SignUp</Typography>
          </Box>
          <SignUpFotm />

          <Typography
            mb={3}
            sx={{
              textAlign: "center",
            }}
          >
            {"If you already have an account,     "}
            <Link to={"/"}>SignIn</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default SignUp;
