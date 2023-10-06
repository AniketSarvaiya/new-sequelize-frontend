import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmin,
  getUser,
  updateAdminProfilePic,
  updateProfile,
  updateProfilePic,
} from "../store/actions/userActions";
import { ToastContainer } from "react-toastify";
import { toasterrormsg, toastsuccessmsg } from "../utils/toastMessages";

export default function Profile() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { user, isLoading, error } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    // Programmatically trigger a click event on the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    // Handle the selected file here, e.g., you can upload it or display it.
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // const imageUrl = URL.createObjectURL(selectedFile);
      // setSelectedImage(imageUrl);
      setSelectedImage(selectedFile);
      if (user?.isUser === "admin") {
        const updateusr = await dispatch(
          updateAdminProfilePic({ profilepic: selectedFile, id: user.id })
        );
        toastsuccessmsg("Profile Picture Updated successfuly..");
        if (updateusr?.data?.status === "success") {
          const token = localStorage.getItem("accessToken");

          const config = {
            headers: {
              "X-auth-token": `${token}`,
            },
          };
          const userData = dispatch(getAdmin(config));
        }
      } else {
        const updateusr = await dispatch(
          updateProfilePic({ profilepic: selectedFile, id: user.id })
        );
        toastsuccessmsg("Profile Picture Updated successfuly..");
        if (updateusr?.data?.status === "success") {
          const token = localStorage.getItem("accessToken");

          const config = {
            headers: {
              "X-auth-token": `${token}`,
            },
          };
          const userData = dispatch(getUser(config));
        }
      }
    }
  };

  const onSubmit = async (formValues) => {
    const userdata = await dispatch(
      updateProfile({
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        id: user.id,
      })
    );
    toastsuccessmsg("Profile update success..");
    console.log(
      "----------------------",
      formValues,
      "--------------",
      userdata
    );
  };

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("studentId", user.studentId);
    }
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
  }, [user, isLoading]);
  return (
    <>
      <ToastContainer />
      <Container>
        <Grid
          mt={2}
          // spacing={{ xs: 10, md: 10 }}
          // height={"100vh"}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            //   alignItems: "center",
          }}
        >
          <Grid item xs={12} md={5} mt={1}>
            {/* <Box> */}
            <Paper
              elevation={1}
              sx={{
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*" // Specify accepted file types (images in this case)
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <IconButton onClick={handleAvatarClick}>
                <Avatar
                  sx={{
                    width: "130px",
                    height: "130px",
                    border: "4px solid #42a5f5",
                  }}
                  src={user.profilepic}
                ></Avatar>
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} mt={{ xs: 2, sm: 0 }} p={1}>
            <Paper elevation={1} mt={0}>
              <Typography
                ml={{ xs: 0, sm: 5 }}
                pt={{ xs: 2, sm: 5 }}
                variant="h3"
                textAlign={{ xs: "center", sm: "start" }}
              >
                Profile
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  p={4}
                  spacing={3}
                  pt={{ sx: 2, md: 10 }}
                  columns={12}
                  flexWrap={"wrap"}
                >
                  {user.isUser !== "admin" && (
                    <Grid item xs={12}>
                      <Controller
                        type="number"
                        name="studentId"
                        control={control}
                        rules={{
                          required: "Student Id is required",
                          pattern: {
                            value: /^[0-9\b]+$/,
                            message:
                              "Invalid Student id, it must be number only",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            disabled
                            {...field}
                            label="Student Id"
                            error={!!errors.studentId}
                            helperText={errors.studentId?.message}
                          />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="firstname"
                      control={control}
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="outlined-required"
                          // disabled={isDisabled}
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
                          // disabled={isDisabled}
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
                          disabled
                          fullWidth
                          {...field}
                          label="Email"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item px={4}>
                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      
                    }}
                  >
                    Save
                  </Button> */}
                  <Button
                    sx={{
                      // paddingY: "15px",
                      marginY: "40px",
                    }}
                    disabled={isDisabled}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    {!isLoading && "Save"}
                    {isLoading && (
                      <CircularProgress color="inherit" size={"1.5rem"} />
                    )}
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
