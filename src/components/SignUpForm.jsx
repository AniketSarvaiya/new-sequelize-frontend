import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { userSignUp } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toasterrormsg, toastsuccessmsg } from "../utils/toastMessages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DisabledByDefault } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmailVerification from "./EmailVerification";

export default function SignUpFotm() {
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [open, setModel] = useState(false);
  const userData = useSelector((state) => state.userAuth);
  const { error, isLoading } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onPasswordVisiblityHandle = () => {
    setPasswordVisibility(!passwordVisiblity);
  };
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      studentId: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoading) {
      setIsDisabled(true);
    }
    if (!isLoading) {
      setIsDisabled(false);
    }
    if (error) {
      toasterrormsg(error);
      console.log(error);
      // reset();
    }
  }, [error, isLoading]);

  const handleClose = () => {
    setModel(false);
    navigate("/");
  };

  const onSubmit = async (formValues) => {
    try {
      console.log(formValues);
      const { data } = await dispatch(userSignUp(formValues));
      if (data === undefined && error === undefined)
        toasterrormsg("Server Error, Try again later...");
      else if (data?.status === "success") {
        toastsuccessmsg("SignUp Success...");
        setModel(true);
      }
      console.log("++++++++++++++++++++++++", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailVerification open={open} handleClose={handleClose} />
      <ToastContainer />
      <Grid container spacing={3} p={4} columns={12} flexWrap={"wrap"}>
        <Grid item xs={12}>
          <Controller
            type="number"
            name="studentId"
            control={control}
            rules={{
              required: "Student Id is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Invalid Student id, it must be number only",
              },
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                disabled={isDisabled}
                {...field}
                label="Student Id"
                error={!!errors.studentId}
                helperText={errors.studentId?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstname"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                fullWidth
                disabled={isDisabled}
                {...field}
                label="First Name"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastname"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <TextField
                fullWidth
                disabled={isDisabled}
                {...field}
                label="Last Name"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                disabled={isDisabled}
                fullWidth
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6, // Change this to your desired minimum length
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field }) => (
              <TextField
                disabled={isDisabled}
                {...field}
                fullWidth
                // onChange={handleOnChange}
                type={passwordVisiblity ? null : "password"}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onPasswordVisiblityHandle}>
                        {passwordVisiblity ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid justifyContent={"end"} display={"flex"} mr={4}></Grid>
      <Box fullWidth p={3}>
        <Button
          sx={{
            paddingY: "15px",
          }}
          disabled={isDisabled}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          endIcon={!isLoading && <LoginIcon />}
        >
          {!isLoading && "SignUp"}
          {isLoading && <CircularProgress color="inherit" size={"1.5rem"} />}
        </Button>
      </Box>
    </form>
  );
}
