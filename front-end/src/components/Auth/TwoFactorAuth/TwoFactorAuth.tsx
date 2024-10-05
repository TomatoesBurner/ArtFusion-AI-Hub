import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const TwoFactorAuth = ({ verifyId, onVerify, isLoading, errorMessage }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify({ code });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">
        Enter the code from your authenticator app:
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        label="2FA Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button variant="contained" type="submit" disabled={isLoading} fullWidth>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default TwoFactorAuth;
