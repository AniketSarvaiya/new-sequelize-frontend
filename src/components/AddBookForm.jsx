import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookImage from "../assets/defaultbook.png";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { insertBook } from "../store/actions/BookAction";
import { toasterrormsg, toastsuccessmsg } from "../utils/toastMessages";
import { ToastContainer, toast } from "react-toastify";

const tabStyles = {
  objectFit: "cover",
};

function AddBookForm({ handleClose }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const bookReducer = useSelector((state) => state.bookReducer);
  const { error, book, isLoading } = bookReducer;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      auther: "",
      isbn: "",
      description: "",
      bookimage: "",
    },
  });

  const handleImage = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      //   setValue("bookimage", selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const onSubmit = async (formValues) => {
    const book = await dispatch(insertBook(formValues));
    debugger;
    console.log(book);
    if (book?.status === "success") {
      toastsuccessmsg("Book Adding Success...");
      handleClose(false);
    }
  };
  useEffect(() => {
    console.log("----------------", bookReducer);
    if (error) toasterrormsg(error.message);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Grid container>
        <Grid item sx={{ marginX: "auto", mt: 7 }} sm={12}>
          <Box textAlign={"center"} m={"auto"}>
            <img
              style={tabStyles}
              height={200}
              width={150}
              src={selectedImage ? selectedImage : BookImage}
            />
          </Box>
        </Grid>
        <Grid item sx={{ marginX: "auto", mb: 0 }}>
          <Controller
            name="bookimage"
            control={control}
            rules={{ required: "image is required" }}
            render={({ field }) => (
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 1, mt: 1 }}
              >
                Upload File
                <input
                  type="file"
                  name="bookimage"
                  hidden
                  {...field}
                  onChange={(e) => {
                    setValue("bookimage", e.target.files[0]);
                    errors.bookimage = null;
                    handleImage(e);
                  }}
                  value={""}
                />
              </Button>
            )}
          />
          {errors.bookimage && (
            <Typography color={"#d32f2f"} variant="p">
              <br />* {errors?.bookimage?.message}
            </Typography>
          )}
        </Grid>
        <Grid
          container
          paddingX={{ xs: 5, sm: 10 }}
          paddingY={{ xs: 5, sm: 5 }}
          spacing={3}
        >
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  //   disabled={isDisabled}
                  {...field}
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="auther"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  //   disabled={isDisabled}
                  {...field}
                  label="Book Auther"
                  error={!!errors.auther}
                  helperText={errors.auther?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              type="number"
              name="isbn"
              control={control}
              rules={{
                required: "Isbn is required",
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: "Invalid ISBN, it must be number only",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Book ISBN"
                  variant="outlined"
                  fullWidth
                  error={!!errors.isbn}
                  helperText={errors.isbn?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              type="number"
              name="description"
              control={control}
              rules={{
                required: "Description is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type your book description"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => handleClose(false)}>
              {"Cancel"}
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" type="submit">
              {"save"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddBookForm;
