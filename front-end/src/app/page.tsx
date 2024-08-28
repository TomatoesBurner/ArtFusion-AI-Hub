// src/app/page.tsx
import React from "react";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Instagram, Facebook, Phone, Email } from "@mui/icons-material";

export default function Home() {
  return (
    <HomeLayout>
      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Ready to make some visual wonders?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "#fff", color: "#fff" }}
          >
            Let's start making magic today.
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ borderColor: "#fff", color: "#fff" }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #444",
          mt: "auto",
          textAlign: "center",
          backgroundColor: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "lg",
            mx: "auto",
          }}
        >
          {/* Add logo here */}
          <Box
            component="img"
            src="/path/to/logo.png"
            alt="Logo"
            sx={{ height: 40 }}
          />

          {/* Social Media Icons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton sx={{ color: "#fff" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Phone />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Email />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{ mt: 2, display: "block", color: "#aaa" }}
        >
          Copyright © www.gtlstudio.com
        </Typography>
      </Box>
    </HomeLayout>
  );
}
