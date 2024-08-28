// src/pages/signin.tsx
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout"; // Assuming you want to use the same layout

export default function SignIn() {
  return (
    <HomeLayout>
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
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "300px",
            mx: "auto",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </HomeLayout>
  );
}
