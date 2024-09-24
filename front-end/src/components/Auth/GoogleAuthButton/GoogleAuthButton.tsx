"use client";

import { Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import React from "react";

const GoogleAuthButton = () => {
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
    console.log("credentialResponse", credentialResponse);
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
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Google />}
      fullWidth
      sx={{ mb: 1 }}
      onClick={() => googleLogin()}
    >
      Log in with Google
    </Button>
  );
};

export default GoogleAuthButton;
