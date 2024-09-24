"use client";

import { Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import React from "react";

const GoogleAuthButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      handleLoginSuccess(credentialResponse);
    },
    onError: () => {
      handleLoginFail();
    },
  });

  const handleLoginSuccess = (credentialResponse: TokenResponse) => {
    if (credentialResponse) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentialResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          googleLogout();
        });
    }
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
