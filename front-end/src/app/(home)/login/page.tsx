"use client";  

import React, { useState } from "react";
import { useRouter } from "next/navigation";  
import Link from "next/link";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Google, Instagram } from "@mui/icons-material";

export default function Login() {
  const router = useRouter();  // Using next/router here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        // On successful login, redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle errors
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

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
                  backgroundColor: "#f0f0f0",
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
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#fff" } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleLogin}
          >
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
