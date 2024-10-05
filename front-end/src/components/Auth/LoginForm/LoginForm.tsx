import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TwoFactorAuth from "../TwoFactorAuth/TwoFactorAuth";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [verifyId, setVerifyId] = useState("");
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginApi(values); // 调用登录 API
        console.log("Login response:", response); // 打印响应以检查数据

        if (response.requireTwoFactor) {
          setVerifyId(response.verifyId); // 设置 verifyId
          setIsTwoFactorEnabled(true); // 启用 2FA 界面
        } else {
          onSubmit(response); // 正常登录
        }
      } catch (error) {
        console.error("Login error:", error);
      }
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

  const handleVerifyTwoFactor = async (values: { code: string }) => {
    setTwoFactorLoading(true);
    setErrorMessage("");
    try {
      const response = await verifyTwoFactorApi({ ...values, verifyId });
      onSubmit(response); // 成功后继续
    } catch (error) {
      setErrorMessage("Invalid 2FA code");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  return (
    <div>
      {!isTwoFactorEnabled ? (
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
      ) : (
        <TwoFactorAuth
          verifyId={verifyId}
          onVerify={handleVerifyTwoFactor}
          isLoading={twoFactorLoading}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default LoginForm;
