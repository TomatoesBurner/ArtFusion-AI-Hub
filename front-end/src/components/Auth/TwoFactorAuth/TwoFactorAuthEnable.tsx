"use client";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import TwoFactorAuth from "./TwoFactorAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/authApi";
import QRCode from "react-qr-code";

export type TwoFactorAuthEnableProps = {
  verifyId: string;
  secret: string;
  totpAuthUrl: string;
  expiresAt: Date;
};

const TwoFactorAuthEnable = ({
  verifyId,
  secret,
  totpAuthUrl,
  expiresAt,
}: TwoFactorAuthEnableProps) => {
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
          // After enabled
          // router to login
        },
        onError: (err) => {},
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
