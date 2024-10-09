"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserApi } from "@/api/userApi";
import { userSliceActions } from "@/store/slices/userSlice";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Box,
  MenuItem,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface User {
  name: string;
  theme: string; // Add a theme property
}

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: User }) => state.user);

  const [formData, setFormData] = useState<User>({
    name: user.name || "",
    theme: user.theme || "Dark", // Default theme set to Dark
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        theme: user.theme || "Dark", // Default theme
      });
    }
  }, [user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await UserApi.updateUser(formData);
      // dispatch(userSliceActions.setUser({ user: response.data }));
      enqueueSnackbar("Invalid credentials", { variant: "error" });
    } catch (error) {
      console.error("Failed to update settings:", error);
      enqueueSnackbar("Invalid credentials", { variant: "error" });
    }
  };

  return (
    <Container
      component={Paper}
      sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Preferred Theme"
              name="theme"
              value={formData.theme}
              onChange={handleThemeChange}
              variant="outlined"
              select
              sx={{ marginBottom: 3 }}
            >
              <MenuItem value="Light">Light</MenuItem>
              <MenuItem value="Dark">Dark</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
            >
              Update Settings
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                // alert("Reset link sent!"); // Implement actual password reset logic here
                enqueueSnackbar("Invalid credentials", { variant: "error" });
              }}
            >
              Forgot Password?
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Settings;
