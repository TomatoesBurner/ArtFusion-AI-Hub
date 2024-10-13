import { Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export type PromptSubmitBoxProps = {
  loading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

const PromptSubmitBox = ({
  loading = false,
  value = "",
  onValueChange,
  onSubmit,
}: PromptSubmitBoxProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onValueChange) {
      onValueChange(event.target.value || "");
    }
  };

  const handlePromptSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <Paper component={Box} position={"relative"}>
      {loading && (
        <LinearProgress sx={{ position: "absolute", top: 0, width: "100%" }} />
      )}
      <TextField
        disabled={loading}
        fullWidth
        variant="standard"
        multiline
        rows={4}
        value={value}
        onChange={handleInputChange}
        placeholder="Type your prompt here..."
        sx={{
          p: 2,
          pb: 5,
          outlineWidth: 0,
        }}
        InputProps={{
          disableUnderline: true,
        }}
      ></TextField>
      <IconButton
        disabled={loading}
        color="primary"
        onClick={handlePromptSubmit}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
        }}
      >
        <Send />
      </IconButton>
    </Paper>
  );
};

export default PromptSubmitBox;
