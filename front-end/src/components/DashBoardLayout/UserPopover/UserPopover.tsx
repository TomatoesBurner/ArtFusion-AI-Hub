import React, { memo, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  AccountCircle,
  Logout,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Box,
} from "@mui/material";
import Profile from "../../Profile/Profile";
import Settings from "@/app/(dashboard)/settings/page";

const UserPopover = () => {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // To manage the currently active section (Profile or Settings)
  const [activeSection, setActiveSection] = useState<string>("");

  const initials = `${user?.lastName[0]}${user?.firstName[0]}`.toUpperCase();

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowSettings(false);
    setActiveSection("profile");
    setAnchorEl(null); // Close the popover when navigating to the profile
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowProfile(false);
    setActiveSection("settings");
    setAnchorEl(null); // Close the popover when navigating to settings
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setActiveSection("");
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    setActiveSection("");
  };

  return (
    <>
      {/* The usual popover for Avatar, Profile, Settings, Logout */}
      {!showProfile && !showSettings && (
        <>
          <IconButton onClick={handleUserMenuClick}>
            <Avatar sx={{ bgcolor: "cGold.main", color: "text.primary" }}>
              {initials}
            </Avatar>
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleSettingsClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}

      {/* Full-screen Profile view with Avatar on top and fixed vertical menu */}
      {(showProfile || showSettings) && (
        <Box display="flex" height="100vh">
          {/* Sidebar with Avatar and Menu with fixed width */}
          <Paper
            elevation={3}
            sx={{
              width: 250, // Fixed width for the sidebar
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              position: "fixed", // Fixed position
              top: 0,
              left: 0,
              height: "100vh", // Full height of the screen
            }}
          >
            {/* Avatar at the top */}
            <Avatar
              sx={{ bgcolor: "cGold.main", color: "text.primary", mb: 2 }}
            >
              {initials}
            </Avatar>

            {/* MenuList for Profile, Settings, Logout */}
            <MenuList sx={{ width: "100%" }}>
              {" "}
              {/* Ensure MenuList takes full width */}
              <MenuItem
                onClick={handleProfileClick}
                selected={activeSection === "profile"}
                sx={activeSection === "profile" ? { fontWeight: "bold" } : {}}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem
                onClick={handleSettingsClick}
                selected={activeSection === "settings"}
                sx={activeSection === "settings" ? { fontWeight: "bold" } : {}}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </MenuList>
          </Paper>

          {/* Main content: either Profile or Settings */}
          <Box flexGrow={1} p={3} ml={25}>
            {" "}
            {/* Margin-left to account for the fixed sidebar */}
            {showProfile && <Profile onClose={handleCloseProfile} />}
            {showSettings && <Settings onClose={handleCloseSettings} />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default memo(UserPopover);
