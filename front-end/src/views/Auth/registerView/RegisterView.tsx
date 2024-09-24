"use client";

import React from "react";
import NextLink from "next/link";
import { Typography, Divider, Stack, Paper, Link } from "@mui/material";
import ClientRegisterForm, {
  TRegisterValues,
} from "@/components/ClientRegisterForm";
import GoogleAuthButton from "@/components/Auth/GoogleAuthButton/GoogleAuthButton";
import FacebookAuthButton from "@/components/Auth/FacebookAuthButton/FacebookAuthButton";

const RegisterView = () => {
  const handleRegisterFormSubmit = (values: TRegisterValues) => {};

  return (
    <Stack height={"100%"} alignItems={"center"} alignContent={"center"}>
      <Stack flexGrow={1} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h3" gutterBottom>
          Create an account
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {"Already have an account? "}
          <Link
            href="/signup"
            component={NextLink}
            underline="none"
            color={"cGold.main"}
          >
            Sign up for free
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
          <GoogleAuthButton />
          <FacebookAuthButton />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RegisterView;
