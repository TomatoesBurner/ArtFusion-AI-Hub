"use client";

import { Google } from "@mui/icons-material";
import { Button, ButtonProps, LinearProgress } from "@mui/material";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import React from "react";

type GoogleAuthButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onAuthSuccess: (codeResponse: CodeResponse) => void;
} & ButtonProps;

const GoogleAuthButton = ({
  children,
  onAuthSuccess,
  disabled = false,
  loading = false,
  ...others
}: GoogleAuthButtonProps) => {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      handleLoginSuccess(credentialResponse);
    },

    onError: () => {
      handleLoginFail();
    },
    flow: "auth-code",
  });

  const handleLoginSuccess = (credentialResponse: CodeResponse) => {
    onAuthSuccess(credentialResponse);
  };

  const handleLoginFail = () => {};

  return (
    // <>
    //   <Button onClick={logout}>test</Button>
    //   <GoogleLogin
    //     width={"400px"}
    //     onSuccess={handleLoginSuccess}
    //     onError={handleLoginFail}
    //   />
    // </>
    <>
      {loading && <LinearProgress />}
      <Button
        disabled={disabled}
        variant="outlined"
        color="inherit"
        startIcon={<Google />}
        fullWidth
        sx={{ mb: 1 }}
        onClick={() => googleLogin()}
        {...others}
      >
        Log in with Google
      </Button>
    </>
  );
};

export default GoogleAuthButton;
