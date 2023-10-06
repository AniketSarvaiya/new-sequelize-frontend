import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AdminSignInForm from "../components/AdminSignInForm";

export default function AdminSignIn() {
  return (
    <>
      <Grid
        container
        height={"100vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={2} sx={{ width: "400px" }}>
          <Avatar
            sx={{ bgcolor: "primary.main", mx: "auto", mt: "40px", mb: "20px" }}
          >
            <SupervisorAccountIcon />
          </Avatar>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4"> Admin SignIn</Typography>
          </Box>
          <AdminSignInForm />
        </Paper>
      </Grid>
    </>
  );
}
