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
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

interface User {
  name: string;
  theme: string; // Add a theme property
  twoFactorEnabled: boolean;
}

const Settings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: User }) => state.user);

  const [formData, setFormData] = useState<User>({
    name: user.name || "",
    theme: user.theme || "Light", // Default theme
    twoFactorEnabled: user.twoFactorEnabled || false,
  });

  useEffect(() => {
    // Ensure that the user is defined before accessing properties
    if (user) {
      setFormData({
        name: user.name || "",
        theme: user.theme || "Light", // Default theme
        twoFactorEnabled: user.twoFactorEnabled || false,
      });
    }
  }, [user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await UserApi.updateUser(formData);
      dispatch(userSliceActions.setUser({ user: formData }));
      alert("Settings updated successfully!");
      onClose(); // Close settings view
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  return (
    <Container
      component={Paper}
      sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
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
              onChange={handleChange}
              variant="outlined"
              select
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="Light">Light</MenuItem>
              <MenuItem value="Dark">Dark</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.twoFactorEnabled}
                  onChange={handleChange}
                  name="twoFactorEnabled"
                />
              }
              label="Enable Two-Factor Authentication"
              sx={{ marginBottom: 2 }}
            />
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
                // Implement actual password reset logic here
                alert("Reset link sent!");
              }}
            >
              Forgot Password?
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Close Button */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            console.log("Close button clicked"); // Log for debugging
            onClose();
          }}
        >
          Close
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
