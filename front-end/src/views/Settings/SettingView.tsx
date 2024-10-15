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
  FormControlLabel,
  Divider,
  Switch,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import TwoFactorAuthEnable from "@/components/Auth/TwoFactorAuth/TwoFactorAuthEnable";
import { AuthApi } from "@/api/authApi";
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog";

interface User {
  firstName: string;
  lastName: string;
  name: string;
  theme: string;
  twoFactorEnabled: boolean; // Add a property to track 2FA status
}

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: User }) => state.user);

  const [formData, setFormData] = useState<User>({
    firstName: user.firstName || "", // Initialize first name
    lastName: user.lastName || "", // Initialize last name
    name: user.name || "",
    theme: user.theme || "Dark", // Default theme set to Dark
    twoFactorEnabled: user.twoFactorEnabled || false, // Track 2FA status
  });

  const [twoFactorData, setTwoFactorData] = useState<any>(null); // State to hold 2FA data
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Dialog state
  const [pendingDisable, setPendingDisable] = useState(false); // Track if the user wants to disable 2FA

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        name: user.name || "",
        theme: user.theme || "Dark", // Default theme
        twoFactorEnabled: user.twoFactorEnabled || false, // Track 2FA status
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
    // Handle theme changes if necessary
  };

  const handleTwoFactorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;

    if (!checked) {
      // Open confirmation dialog if disabling 2FA
      setPendingDisable(true);
      setConfirmDialogOpen(true);
    } else {
      // Enable Two-Factor Authentication
      enableTwoFactor();
      setFormData((prevData) => ({
        ...prevData,
        twoFactorEnabled: checked,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await UserApi.updateUser(formData);
      // dispatch(userSliceActions.setUser({ user: response.data }));
      enqueueSnackbar("Settings updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Failed to update settings:", error);
      enqueueSnackbar("Failed to update settings", { variant: "error" });
    }
  };

  // Function to enable Two-Factor Authentication
  const enableTwoFactor = async () => {
    try {
      const response = await AuthApi.enableTwoFactor(); // Make the API call
      if (response.status === "success") {
        setTwoFactorData(response.data); // Set the response data to state
      }
    } catch (error) {
      enqueueSnackbar("Failed to enable Two-Factor Authentication", {
        variant: "error",
      });
    }
  };

  // Function to handle successful 2FA enabling
  const handleTwoFactorSuccess = () => {
    enqueueSnackbar("Two-Factor Authentication enabled successfully!", {
      variant: "success",
    });
    setTwoFactorData(null); // Hide the TwoFactorAuthEnable component
    setFormData((prevData) => ({
      ...prevData,
      twoFactorEnabled: true, // Update state to indicate 2FA is enabled
    }));
  };

  return (
    <Container
      component={Paper}
      sx={{ padding: 4, borderRadius: 2, boxShadow: 3 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: 2 }}
      >
        Settings
      </Typography>

      {/* Divider and Account Settings Section */}
      <Divider sx={{ marginBottom: 3 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Account Settings
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Display Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Preferred Theme"
              name="theme"
              value={formData.theme}
              onChange={handleThemeChange}
              variant="outlined"
              select
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="Light">Light</MenuItem>
              <MenuItem value="Dark">Dark</MenuItem>
            </TextField>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginBottom: 1 }}
            >
              Update Settings
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                // Handle forgot password logic
                enqueueSnackbar("Forgot password logic here", {
                  variant: "info",
                });
              }}
              sx={{ marginBottom: 1 }}
            >
              Forgot Password?
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Divider and Security Settings Section */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Security Settings
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={formData.twoFactorEnabled}
            onChange={handleTwoFactorChange}
            color="primary"
          />
        }
        label="Enable Two-Factor Authentication"
        sx={{ marginTop: 1 }}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={() => {
          setConfirmDialogOpen(false);
          setTwoFactorData(null); // Hide the TwoFactorAuthEnable component
          setFormData((prevData) => ({
            ...prevData,
            twoFactorEnabled: false,
          }));
          enqueueSnackbar("Two-Factor Authentication disabled", {
            variant: "success",
          });
        }}
        title="Confirm Disable Two-Factor Authentication"
        message="Are you sure you want to disable Two-Factor Authentication? This action can reduce the security of your account."
      />

      {/* Display TwoFactorAuthEnable component if data is available */}
      {twoFactorData && (
        <TwoFactorAuthEnable
          verifyId={twoFactorData.verifyId}
          secret={twoFactorData.secret}
          totpAuthUrl={twoFactorData.totpAuthUrl}
          expiresAt={twoFactorData.expiresAt}
          onSuccess={handleTwoFactorSuccess} // Pass the success handler
        />
      )}
    </Container>
  );
};

export default Settings;
