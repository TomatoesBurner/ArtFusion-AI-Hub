"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { signup } from "../utils/api";

// Validation schema for form fields
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ClientRegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "", // Update name to match backend requirement
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await signup(values); // Pass the entire values object directly
        console.log("Registration successful", data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("username")}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ mb: 2 }}
        InputProps={{ sx: { color: "#fff" } }}
        InputLabelProps={{ sx: { color: "#fff" } }}
      />
      <TextField
        label="Email Address"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 2 }}
        InputProps={{ sx: { color: "#fff" } }}
        InputLabelProps={{ sx: { color: "#fff" } }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 2 }}
        InputProps={{ sx: { color: "#fff" } }}
        InputLabelProps={{ sx: { color: "#fff" } }}
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("passwordConfirm")} // Updated key
        error={
          formik.touched.passwordConfirm &&
          Boolean(formik.errors.passwordConfirm)
        }
        helperText={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        }
        sx={{ mb: 2 }}
        InputProps={{ sx: { color: "#fff" } }}
        InputLabelProps={{ sx: { color: "#fff" } }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2 }}
      >
        Register
      </Button>
    </form>
  );
};

export default ClientRegisterForm;
