"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const ClientRegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        // Handle successful registration
        console.log("Registration successful");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2 }}
      >
        Next
      </Button>
    </form>
  );
};

export default ClientRegisterForm;
