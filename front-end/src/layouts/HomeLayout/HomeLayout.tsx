"use client";

// src/layouts/HomeLayout/HomeLayout.tsx

import React from "react";
import { Container, Box, useTheme, CssBaseline } from "@mui/material";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  console.log(theme);

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
