"use client";

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { getGoogleAuthURL } from "@/utils/authUtils";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Get the Google Auth URL
    const googleAuthURL = getGoogleAuthURL();
    // Redirect the user to the Google login page
    window.location.href = googleAuthURL;
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Google />}
      fullWidth
      sx={{ mb: 2 }}
      onClick={handleLogin}
    >
      Log in with Google
    </Button>
  );
};

export default GoogleLoginButton;
