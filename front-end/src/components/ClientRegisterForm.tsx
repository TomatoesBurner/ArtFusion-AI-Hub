"use client";

import React from "react";
import { TextField, Button } from "@mui/material";

const ClientRegisterForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 处理表单提交逻辑
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email Address"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
        InputProps={{ sx: { color: "#fff" } }}
        InputLabelProps={{ sx: { color: "#fff" } }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2 }}
      >
        Next
      </Button>
    </form>
  );
};

export default ClientRegisterForm;
