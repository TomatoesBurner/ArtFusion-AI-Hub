import useAuth from "@/hooks/useAuth";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
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

const UserPopover = () => {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showProfile, setShowProfile] = useState(false);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setAnchorEl(null);
  };

  const initials = `${user?.lastName[0]}${user?.firstName[0]}`.toUpperCase();

  const handleCloseProfile = () => {
    setShowProfile(false); // close Profile
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
            <Settings />
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
    </>
  );
};
export default memo(UserPopover);
