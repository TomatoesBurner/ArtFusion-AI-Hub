"use client";

import { useRouter } from "next/navigation";
import React from "react";
import NextLink from "next/link";
import { Typography, Stack, Link, Paper } from "@mui/material";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/Auth/FacebookAuthButton/FacebookAuthButton";
import LoginForm, { TLoginValues } from "@/components/Auth/LoginForm/LoginForm";

const LoginView = () => {
  const router = useRouter();

  const handleLoginFormSubmit = (values: TLoginValues) => {
    console.log("Login form values:", values);
  };

  return (
    <Stack height={"100%"} alignItems={"center"} alignContent={"center"}>
      <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h3" gutterBottom>
          Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {"Don't have an account? "}
          <Link
            href="/signup"
            component={NextLink}
            underline="none"
            color={"cGold.main"}
          >
            Sign up for free
          </Link>
        </Typography>

        {/* Login Card */}
        <Paper>
          <Stack
            maxWidth={"400px"}
            p={4}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Typography align="center" variant="h5" mb={2}>
              Log in
            </Typography>
            {/* Email and password login form */}
            <LoginForm onSubmit={handleLoginFormSubmit} />
            <Typography align="center" variant="body2" sx={{ my: 2 }}>
              OR
            </Typography>
            {/* External Auth */}
            <GoogleAuthButton />
            <FacebookAuthButton />
            {/* TODO: forgot password page */}
            <Link component={NextLink} href={""} underline="none">
              <Typography component={"span"} variant="caption">
                Forgot Password
              </Typography>
            </Link>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default LoginView;
