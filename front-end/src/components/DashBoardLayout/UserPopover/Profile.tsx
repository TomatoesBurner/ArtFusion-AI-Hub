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
} from "@mui/material";

const Profile = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserApi.updateUser(formData);
      dispatch(userSliceActions.setUser({ user: formData }));
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Container
      component={Paper}
      sx={{ padding: 4, position: "relative", boxShadow: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Box>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
