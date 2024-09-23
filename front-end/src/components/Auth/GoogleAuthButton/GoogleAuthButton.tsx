"use client";

import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const GoogleAuthButton = () => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Google />}
      fullWidth
      sx={{ mb: 1 }}
    >
      Log in with Google
    </Button>
  );
};

export default GoogleAuthButton;
