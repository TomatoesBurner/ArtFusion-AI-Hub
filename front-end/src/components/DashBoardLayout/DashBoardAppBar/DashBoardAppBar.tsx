"use client";

import { APP_NAME } from "@/utils/constant";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";

const DashBoardAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h2">{APP_NAME}</Typography>
        <Stack flexGrow={1}></Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashBoardAppBar;
