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
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" mb={3}>
        Scan the below QR Code :
      </Typography>
      {/* TODO: below display qr code  */}
      <QRCode value={totpAuthUrl || ""} />
      <Typography variant="h5" mb={3}>
        Or save below secret
      </Typography>

      <Typography variant="h5" mb={3}>
        {secret}
      </Typography>

      <TwoFactorAuth
        verifyId={verifyId}
        expiresAt={expiresAt}
        onVerify={handleEnableVerify}
        mode="enable"
      ></TwoFactorAuth>
    </Paper>
  );
};

export default TwoFactorAuthEnable;
