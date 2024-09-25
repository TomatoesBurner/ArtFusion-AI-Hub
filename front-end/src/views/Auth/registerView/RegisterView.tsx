"use client";

import React from "react";
import NextLink from "next/link";
import { Typography, Divider, Stack, Paper, Link } from "@mui/material";
import ClientRegisterForm, {
  TRegisterValues,
} from "@/components/ClientRegisterForm";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/Auth/FacebookAuthButton/FacebookAuthButton";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/authApi";
import { AUTH_METHOD } from "@/utils/constant";
import { enqueueSnackbar } from "notistack";
import { CodeResponse } from "@react-oauth/google";

const RegisterView = () => {
  const { register, login } = useAuth();
  const { isPending: oAuthGooglePending, mutate: oAuthGoogleLoginMutate } =
    useMutation({
      mutationFn: AuthApi.oAuthLogin,
    });
  const { isPending: registerPending, mutate: registerMutate } = useMutation({
    mutationFn: AuthApi.register,
  });

  const handleRegisterFormSubmit = (values: TRegisterValues) => {
    registerMutate(
      {
        name: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          register(data.data);
        },
        onError: () => {
          enqueueSnackbar("Failed to register", { variant: "error" });
        },
      }
    );
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

  const anyLoading = oAuthGooglePending || registerPending;

  return (
    <Stack height={"100%"} alignItems={"center"} alignContent={"center"}>
      <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h3" gutterBottom>
          Create an account
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {"Already have an account? "}
          <Link
            href="/login"
            component={NextLink}
            underline="none"
            color={"cGold.main"}
          >
            Sign In
          </Link>
        </Typography>

        {/* Register Card */}
        <Paper
          component={Stack}
          maxWidth={"500px"}
          p={4}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <ClientRegisterForm onSubmit={handleRegisterFormSubmit} />

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* External Auth */}
          <GoogleAuthButton onAuthSuccess={handleGoogleAuthSuccess} />
          <FacebookAuthButton />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RegisterView;
