"use client";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import TwoFactorAuth from "./TwoFactorAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/authApi";
import QRCode from "react-qr-code";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export type TwoFactorAuthEnableProps = {
  verifyId: string;
  secret: string;
  totpAuthUrl: string;
  expiresAt: Date;
  onSuccess: () => void;
};

const TwoFactorAuthEnable = ({
  verifyId,
  secret,
  totpAuthUrl,
  expiresAt,
  onSuccess, // Receive onSuccess prop
}: TwoFactorAuthEnableProps) => {
  const router = useRouter(); // Initialize useRouter
  const { logout } = useAuth(); // Access logout function
  const { isPending: verifyTwoFactorPending, mutate: verifyTwoFactorMutate } =
    useMutation({
      mutationFn: AuthApi.verifyTwoFactor,
    });
  const handleEnableVerify = (code: string) => {
    verifyTwoFactorMutate(
      {
        verifyId: verifyId,
        token: code,
      },
      {
        onSuccess: (data) => {
          // Show success message with redirection notice
          enqueueSnackbar(
            "Two-Factor Authentication enabled successfully! You will be redirected to the login page in 10 seconds.",
            {
              variant: "success",
            }
          );

          // Set a timeout to log out the user and redirect
          setTimeout(() => {
            logout(); // Call the logout function to log out the user
            router.push("/login"); // Redirect to the login page
          }, 10000); // Delay of 10 seconds

          onSuccess(); // Call the onSuccess function
        },
        onError: (err) => {
          enqueueSnackbar("Failed to verify code. Please try again.", {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <Paper
      sx={{ padding: 4, textAlign: "center", borderRadius: 2, boxShadow: 3 }}
    >
      <Typography variant="h5" mb={2} sx={{ fontWeight: "bold" }}>
        Set Up Two-Factor Authentication
      </Typography>

      {/* Instructions */}
      <Typography variant="body1" mb={2} sx={{ color: "text.secondary" }}>
        Use your authenticator app to scan the QR code above.
      </Typography>

      {/* QR Code container with styling */}
      {/* QR Code container with styling */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          border: "1px solid #aaa",
          borderRadius: "8px",
          padding: 1,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <QRCode
          value={totpAuthUrl || ""}
          size={200}
          style={{ borderRadius: "8px" }}
        />
      </Box>

      <Typography variant="body1" mb={2} mt={2}>
        Or save the following secret:
      </Typography>

      <Typography
        variant="body1"
        mb={3}
        sx={{ fontWeight: "bold", wordWrap: "break-word" }}
      >
        {secret}
      </Typography>

      <TwoFactorAuth
        verifyId={verifyId}
        expiresAt={expiresAt}
        onVerify={handleEnableVerify}
        mode="enable"
      />
    </Paper>
  );
};

export default TwoFactorAuthEnable;
