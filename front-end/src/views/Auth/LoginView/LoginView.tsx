"use client";

import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import NextLink from "next/link";
import { Typography, Stack, Link, Paper, Divider } from "@mui/material";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/Auth/FacebookAuthButton/FacebookAuthButton";
import LoginForm, { TLoginValues } from "@/components/Auth/LoginForm/LoginForm";
import useAuth from "@/hooks/useAuth";
import { AuthApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { CodeResponse } from "@react-oauth/google";
import { AUTH_METHOD } from "@/utils/constant";

const LoginView = () => {
  const { isPending: oAuthGooglePending, mutate: oAuthGoogleLoginMutate } =
    useMutation({
      mutationFn: AuthApi.oAuthLogin,
    });
  const { isPending: loginPending, mutate: loginMutate } = useMutation({
    mutationFn: AuthApi.login,
  });

  const { login } = useAuth();

  const handleLoginFormSubmit = (values: TLoginValues) => {
    loginMutate(values, {
      onSuccess: (data) => {
        login(data.data);
      },

      onError: (err) => {
        enqueueSnackbar("Invalid credentials", { variant: "error" });
      },
    });
  };

  const handleGoogleAuthSuccess = (codeResponse: CodeResponse) => {
    oAuthGoogleLoginMutate(
      {
        googleAuthCode: codeResponse.code,
        provider: AUTH_METHOD.GOOGLE,
      },
      {
        onSuccess: (data) => {
          login(data.data);
        },
        onError: () => {
          enqueueSnackbar("Failed to login with google", { variant: "error" });
        },
      }
    );
  };

  const anyLoading = loginPending || oAuthGooglePending;

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
        <Paper
          component={Stack}
          width={"500px"}
          p={4}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Typography align="center" variant="h5" mb={2}>
            Log in
          </Typography>

          {/* Email and password login form */}
          <LoginForm
            isLoading={loginPending}
            disableAll={anyLoading}
            onSubmit={handleLoginFormSubmit}
          />

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* External Auth */}
          <GoogleAuthButton
            disabled={anyLoading}
            loading={oAuthGooglePending}
            onAuthSuccess={handleGoogleAuthSuccess}
          />
          <FacebookAuthButton />

          {/* TODO: forgot password page */}
          <Link component={NextLink} href={""} underline="none">
            <Typography component={"span"} variant="caption">
              Forgot Password
            </Typography>
          </Link>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default memo(LoginView);
