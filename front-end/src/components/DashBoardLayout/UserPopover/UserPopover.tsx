import useAuth from "@/hooks/useAuth";
import {
  AccountCircle,
  Logout,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import React, { memo, useState } from "react";
import Profile from "./Profile";
import Settings from "./Settings";

const UserPopover = () => {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showProfile, setShowProfile] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowSettings(false); // Ensure Settings is closed when opening Profile
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowProfile(false); // Ensure Profile is closed when opening Settings
    setAnchorEl(null);
  };

  const initials = `${user?.lastName[0]}${user?.firstName[0]}`.toUpperCase();

  const handleCloseProfile = () => {
    setShowProfile(false); // close Profile
  };

  const handleCloseSettings = () => {
    setShowSettings(false); // Close Settings
  };

  return (
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

      {showProfile && <Profile onClose={handleCloseProfile} />}
      {showSettings && <Settings onClose={handleCloseSettings} />}
    </>
  );
};
export default memo(UserPopover);
