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
import { RootState } from "@/store/store";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Initialize form data with user details from the Redux store
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    name: user.name || "",
    email: user.email || "",
    themeMode: user.themeMode || "dark",
  });

  useEffect(() => {
    // Update form data when user info changes
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      themeMode: user.themeMode,
    });
  }, [user]);

  return (
    <Container
      component={Paper}
      sx={{ padding: 4, position: "relative", boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        Profile
      </Typography>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            label="Display Name"
            name="name"
            value={formData.name}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            select
            fullWidth
            label="Theme Mode"
            name="themeMode"
            value={formData.themeMode}
            variant="outlined"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
