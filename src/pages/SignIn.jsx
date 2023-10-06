import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
// import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function SignIn() {
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
            <LockOpenIcon />
          </Avatar>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4"> SignIn</Typography>
          </Box>
          <SignInForm />
          <Typography
            mb={3}
            sx={{
              textAlign: "center",
            }}
          >
            {"Don't have an account ,"}
            <Link to={"/signup"}>SignUp</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default SignIn;
