"use client";

// src/layouts/HomeLayout/HomeLayout.tsx

import React from "react";
import { Container, Box } from "@mui/material";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth="false" // Set to false to disable the default maxWidth behavior
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0, // Remove padding
        margin: 0, // Remove margin
        width: "100%", // Ensure full width
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box>{" "}
      {/* Use flexGrow to ensure space for footer */}
    </Container>
  );
};

export default HomeLayout;
