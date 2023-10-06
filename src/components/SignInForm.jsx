import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toasterrormsg, toastsuccessmsg } from "../utils/toastMessages";
import { userSignIn } from "../store/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import EmailVerification from "./EmailVerification";

function SignInForm() {
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [data, setData] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setModel] = useState(false);

  const userData = useSelector((state) => state.userAuth);
  const { error, isLoading } = userData;

  const onPasswordVisiblityHandle = () => {
    setPasswordVisibility(!passwordVisiblity);
  };

  useEffect(() => {
    if (isLoading) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    if (error) {
      toasterrormsg(error);
      console.log(error);
      reset();
    }
  }, [error, isLoading]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleClose = () => {
    setModel(false);
    // navigate("/");
  };
  const onSubmit = async (formValues) => {
    debugger;
    const { data } = await dispatch(userSignIn(formValues));
    if (data === undefined && error === undefined)
      toasterrormsg("Server Error, Try again later...");
    if (data?.status === "success") {
      toastsuccessmsg("SignIn Success...");
      localStorage.setItem("accessToken", data.token);
      navigate("/home");
    }
    if (data?.status === "verify") {
      setModel(true);
    }
    console.log("++++++++++++++++++++++++", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailVerification open={open} handleClose={handleClose} />
      <ToastContainer />
      <Grid container spacing={3} p={4} columns={12} flexWrap={"wrap"}>
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
                {...field}
                fullWidth
                disabled={isDisabled}
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
      <Grid justifyContent={"end"} display={"flex"} mr={4}>
        <Typography>
          {"Don't Remember"}
          <Link to={"/signup"}> Forgot Password</Link>
        </Typography>
      </Grid>
      <Box fullWidth p={3}>
        <Button
          disabled={isDisabled}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          endIcon={!isLoading && <LoginIcon />}
        >
          {!isLoading && "SignIn"}
          {isLoading && <CircularProgress color="inherit" size={"1.5rem"} />}
        </Button>
      </Box>
    </form>
  );
}

export default SignInForm;
