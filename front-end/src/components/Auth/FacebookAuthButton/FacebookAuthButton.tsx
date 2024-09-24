"use client";

import { Instagram } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import React from "react";

type FacebookAuthButtonProps = {} & ButtonProps;

const FacebookAuthButton = ({
  children,
  ...others
}: FacebookAuthButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Instagram />}
      fullWidth
      sx={{ mb: 2 }}
      disabled
      {...others}
    >
      Log in with Facebook
    </Button>
  );
};

export default FacebookAuthButton;
