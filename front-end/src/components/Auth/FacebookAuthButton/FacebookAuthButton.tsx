"use client";

import { Instagram } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const FacebookAuthButton = () => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Instagram />}
      fullWidth
      sx={{ mb: 2 }}
    >
      Log in with Facebook
    </Button>
  );
};

export default FacebookAuthButton;
