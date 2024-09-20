"use client";

import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        py: 3,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Link
            href="mailto:info@artfusion.com"
            underline="none"
            sx={{
              fontSize: "1rem",
              color: "inherit",
              borderBottom: 2,
              borderColor: "text.primary",
              pb: 0.2,
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            Contact Us: info@artfusion.com
          </Link>
          <Box
            component="ul"
            sx={{
              display: "flex",
              gap: 3,
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            <li>
              <Link
                href="#"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Support
              </Link>
            </li>
          </Box>
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          © 2024 GTL ArtFusion. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
