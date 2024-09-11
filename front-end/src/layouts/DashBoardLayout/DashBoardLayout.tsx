"use client";

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import DashBoardAppBar from "@/components/DashBoardLayout/DashBoardAppBar/DashBoardAppBar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display={"flex"}>
      <CssBaseline />
      <DashBoardAppBar />
      <Box component={"main"}>{children}</Box>
    </Box>
  );
};

export default DashBoardLayout;
