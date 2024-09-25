"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type TLoginValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  disableAll?: boolean;
  isLoading?: boolean;
  onSubmit: (values: TLoginValues) => void;
};

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = ({
  onSubmit,
  disableAll = false,
  isLoading = false,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

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
        variant="outlined"
        size="small"
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
      <FormControl sx={{ mb: 2 }} variant="outlined" size="small" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                aria-label="toggle password visibility"
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
      {/* <TextField
        variant="outlined"
        size="small"
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
      /> */}
      <Button
        disabled={disableAll}
        variant="contained"
        size="medium"
        fullWidth
        color="cGold"
        type="submit"
        sx={{
          minHeight: "40px",
        }}
      >
        {isLoading ? <CircularProgress size={"1.5rem"} /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
