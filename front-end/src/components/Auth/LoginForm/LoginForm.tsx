"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";

export type TLoginValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (values: TLoginValues) => void;
};

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,

    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        variant="outlined"
        id="email"
        name="email"
        label="Email"
        placeholder="Email"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        variant="outlined"
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        color="cGold"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
