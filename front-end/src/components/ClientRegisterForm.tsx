"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type TRegisterValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ClientRegisterFormProps = {
  disableAll?: boolean;
  isLoading?: boolean;
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

const ClientRegisterForm = ({
  disableAll = false,
  isLoading = false,
  onSubmit,
}: ClientRegisterFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        disabled={disableAll}
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
          disabled={disableAll}
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
          disabled={disableAll}
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
        disabled={disableAll}
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
      <FormControl sx={{ mb: 2 }} variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          disabled={disableAll}
          id="password"
          name="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          placeholder="Password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText
          error={formik.touched.password && Boolean(formik.errors.password)}
        >
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      </FormControl>

      <FormControl sx={{ mb: 2 }} variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
        <OutlinedInput
          disabled={disableAll}
          id="passwordConfirm"
          name="passwordConfirm"
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          placeholder="Password"
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirm}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
        >
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        </FormHelperText>
      </FormControl>
      <Button
        disabled={disableAll}
        type="submit"
        variant="contained"
        size="medium"
        color="cGold"
        fullWidth
        sx={{ minHeight: "40px" }}
      >
        {isLoading ? <CircularProgress size={"1.5rem"} /> : "Register"}
      </Button>
    </form>
  );
};

export default ClientRegisterForm;
