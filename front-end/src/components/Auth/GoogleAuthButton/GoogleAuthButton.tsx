"use client";

import { Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import {
  CodeResponse,
  CredentialResponse,
  GoogleLogin,
  TokenResponse,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import React from "react";

const GoogleAuthButton = () => {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: (credentialResponse) => {
  //     handleLoginSuccess(credentialResponse);
  //   },
  //   onError: () => {
  //     handleLoginFail();
  //   },
  //   flow: "auth-code",
  // });

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log("value++", credentialResponse);
  };

  const handleLoginFail = () => {};

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFail} />
    // <Button
    //   variant="outlined"
    //   color="inherit"
    //   startIcon={<Google />}
    //   fullWidth
    //   sx={{ mb: 1 }}
    //   onClick={() => googleLogin()}
    // >
    //   Log in with Google
    // </Button>
  );
};

export default GoogleAuthButton;
