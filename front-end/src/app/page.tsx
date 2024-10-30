// src/app/page.tsx
import React from "react";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Instagram, Facebook, Phone, Email } from "@mui/icons-material";
import Link from "next/link";
import UnAuthGuardWrapper from "@/wrappers/UnAuthGuardWrapper";

// TODO:
// Move the home page code into a file in /views
// Put the components in /components. Example, /components/home/footer
// There is error with nested a tags below.

export default function Home() {
  return (
    <UnAuthGuardWrapper>
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
          <Link href="/video" passHref>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: "'Tahoma', sans-serif",
                letterSpacing: "0.03em",
                fontSize: "3.7rem",
                transition:
                  "background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s",
                padding: "120px 70px",
                background: "transparent",
                backgroundImage: "url('/images/eye-forhome.jpg')",
                backgroundSize: "cover", // Ensure the background covers the entire area
                backgroundPosition: "center",
                borderRadius: "8px", // Add rounded corners
                border: "2px solid transparent", // Start with a transparent border
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for depth
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 215, 0, 0.3))", // Gradient effect on hover
                  color: "#fff", // Keep text color white for contrast

                  transform: "scale(1.05)", // Slightly enlarge text on hover
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)", // Deeper shadow on hover
                },
              }}
            >
              Ready to make some visual wonders?
            </Typography>
          </Link>
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Link href="/login" passHref>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderColor: "#fff", color: "#fff" }}
              >
                {"Let's start making magic today."}
              </Button>
            </Link>

            {/* 将 Link 放在外部，Button 在内部 */}
            <Link href="/login" passHref>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderColor: "#fff", color: "#fff" }}
              >
                Get Started
              </Button>
            </Link>
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
              src="/images/logo.png"
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
    </UnAuthGuardWrapper>
  );
}
