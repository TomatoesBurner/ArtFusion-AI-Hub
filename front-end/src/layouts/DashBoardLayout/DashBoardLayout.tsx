"use client";

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import DashBoardAppBar from "@/components/DashBoardLayout/DashBoardAppBar/DashBoardAppBar";
import { APP_BAR_HEIGHT } from "@/utils/constant";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <CssBaseline />
      <DashBoardAppBar />
      <Box component={"main"} flexGrow={1} width={"100%"} pt={APP_BAR_HEIGHT}>
        {children}
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
