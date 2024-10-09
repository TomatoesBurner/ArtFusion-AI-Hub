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
    <Paper sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h5" mb={3}>
        Scan the QR Code to set up Two-Factor Authentication:
      </Typography>

      {/* Instructions */}
      <Typography variant="body2" mb={2}>
        Use your authenticator app to scan the QR code above. If you cannot scan
        the QR code, you can enter the secret manually.
      </Typography>

      {/* QR Code container with styling */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <QRCode
          value={totpAuthUrl || ""}
          size={256}
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        />
      </Box>

      <Typography variant="h5" mb={3}>
        Or save the following secret:
      </Typography>

      <Typography variant="h6" mb={3}>
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
