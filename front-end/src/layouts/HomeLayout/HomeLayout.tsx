"use client";

// src/layouts/HomeLayout/HomeLayout.tsx

import React from "react";
import { Box, CssBaseline } from "@mui/material";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <Box component={"main"} flexGrow={1} width={"100%"}>
        <CssBaseline />
        {children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
