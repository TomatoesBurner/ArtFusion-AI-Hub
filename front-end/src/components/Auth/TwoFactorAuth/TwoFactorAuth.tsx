import React, { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/authApi";
import useAuth from "@/hooks/useAuth";
import { enqueueSnackbar } from "notistack";
import { differenceInSeconds, intervalToDuration } from "date-fns";

export type TTwoFactorMode = "login" | "enable";

export type TwoFactorAuthProps = {
  verifyId: string;
  expiresAt: Date;
  mode?: TTwoFactorMode;
  // Only used with enable mode
  onVerify?: (code: string) => void;
};

const TwoFactorAuth = ({
  verifyId,
  expiresAt,
  onVerify,
  mode = "login",
}: TwoFactorAuthProps) => {
  const { login } = useAuth();
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(
    differenceInSeconds(expiresAt, Date.now())
  );
  const { isPending: verifyTwoFactorPending, mutate: verifyTwoFactorMutate } =
    useMutation({
      mutationFn: AuthApi.verifyTwoFactor,
    });

  useEffect(() => {
    let intervalId = setInterval(() => {
      setSecondsLeft(differenceInSeconds(expiresAt, Date.now()));

      if (secondsLeft == 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const duration = intervalToDuration({ start: 0, end: secondsLeft * 1000 });

  const handleSubmit = (event: any) => {
    if (code.length != 6) return;

    if (mode == "enable") {
      // enable mode
      if (onVerify) onVerify(code);
    } else {
      // login mode
      verifyTwoFactorMutate(
        {
          verifyId: verifyId,
          token: code,
        },
        {
          onSuccess: (data) => {
            login(data.data);
          },
          onError: (err) => {
            enqueueSnackbar("Invalid code", { variant: "error" });
          },
        }
      );
    }
  };

  return (
    <>
      <Typography variant="h5" mb={3}>
        Enter the code from your authenticator app:
      </Typography>
      <Typography variant="h5" mb={3}>
        s{`${duration.minutes || 0}:${duration.seconds || 0}`} minutes left
      </Typography>
      <TextField
        variant="outlined"
        label="2FA Code"
        value={code}
        inputProps={{ maxlength: 6 }}
        onChange={(e) => setCode(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        fullWidth
        size="large"
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Verify
      </Button>
    </>
  );
};

export default TwoFactorAuth;
