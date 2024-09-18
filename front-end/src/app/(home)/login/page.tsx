import React from "react";
import Link from "next/link";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { Google, Instagram } from "@mui/icons-material";

export default function Login() {
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
          px: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to GTL AI Hub
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Don't have an account?{" "}
          <Link href="/signup" passHref>
            <Button
              color="inherit"
              sx={{
                p: 0.8,
                backgroundColor: "#ffffff",
                color: "#000000",
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light grey hover
                },
              }}
            >
              Sign up for free
            </Button>
          </Link>
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#222",
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Log in
          </Typography>
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#fff" } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#fff" } }}
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Log in
          </Button>

          <Typography variant="body2" sx={{ mb: 2 }}>
            OR
          </Typography>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Google />}
            fullWidth
            sx={{ mb: 1 }}
          >
            Log in with Google
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Instagram />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Log in with Instagram
          </Button>

          <Button variant="text" color="inherit">
            Forgot Password
          </Button>
        </Box>
      </Box>
    </HomeLayout>
  );
}
