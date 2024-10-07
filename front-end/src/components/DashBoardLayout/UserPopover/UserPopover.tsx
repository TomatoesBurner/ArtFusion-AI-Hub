import React, { memo, useState, useEffect } from "react";
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
} from "@mui/material";
import Profile from "../../Profile/Profile";
import Settings from "@/app/(dashboard)/settings/page";

const UserPopover = () => {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeComponent, setActiveComponent] = useState<
    "profile" | "settings" | null
  >(null);

  const initials = `${user?.lastName[0]}${user?.firstName[0]}`.toUpperCase();

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfileClick = () => {
    setActiveComponent("profile");
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setActiveComponent("settings");
    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setActiveComponent(null); // Close Profile
  };

  const handleCloseSettings = () => {
    setActiveComponent(null); // Close Settings
  };

  useEffect(() => {
    console.log("Active component:", activeComponent);
  }, [activeComponent]);

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

      {activeComponent === "profile" && (
        <Profile onClose={handleCloseProfile} />
      )}
      {activeComponent === "settings" && (
        <Settings onClose={handleCloseSettings} />
      )}
    </>
  );
};

export default memo(UserPopover);
