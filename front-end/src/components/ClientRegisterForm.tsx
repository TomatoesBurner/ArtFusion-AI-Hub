"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack } from "@mui/material";

export type TRegisterValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ClientRegisterFormProps = {
  onSubmit: (values: TRegisterValues) => void;
};

// Validation schema for form fields
const validationSchema = Yup.object({
  username: Yup.string().min(3).max(50).required("Username is required"),
  firstName: Yup.string().min(2).max(50).required(),
  lastName: Yup.string().min(2).max(50).required(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    // TODO: Add fancy password error
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/,
      "Invalid password"
    )
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ClientRegisterForm = ({ onSubmit }: ClientRegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Username"
        variant="outlined"
        size="small"
        id="username"
        name="username"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ mb: 2 }}
      />

      <Stack direction={"row"} gap={2}>
        <TextField
          label="Firstname"
          variant="outlined"
          size="small"
          id="firstName"
          name="firstName"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Lastname"
          variant="outlined"
          size="small"
          id="lastName"
          name="lastName"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ mb: 2 }}
        />
      </Stack>

      <TextField
        label="Email Address"
        type="email"
        name="email"
        size="small"
        id="email"
        variant="outlined"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        size="small"
        id="password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Confirm Password"
        id="passwordConfirm"
        size="small"
        name="passwordConfirm"
        type="password"
        variant="outlined"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passwordConfirm &&
          Boolean(formik.errors.passwordConfirm)
        }
        helperText={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        }
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="cGold"
        fullWidth
        sx={{ mb: 2 }}
      >
        Register
      </Button>
    </form>
  );
};

export default ClientRegisterForm;
