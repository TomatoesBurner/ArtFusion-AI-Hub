import useAuth from "@/hooks/useAuth";
import { APP_PATH } from "@/utils/constant";
import {
  AccountCircle,
  Logout,
  Settings,
  Dashboard,
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
import { usePathname, useRouter } from "next/navigation";
import React, { memo } from "react";

const UserPopover = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    router.push(APP_PATH.PROFILE);
  };

  const handleSettingsClick = () => {
    setAnchorEl(null);
    router.push(APP_PATH.SETTINGS);
  };

  const handleDashboardClick = () => {
    setAnchorEl(null);
    router.push(APP_PATH.DASHBOARD); // Navigate to the Dashboard
  };

  const initials = `${user?.lastName[0]}${user?.firstName[0]}`.toUpperCase();

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
        <MenuItem
          selected={pathName == APP_PATH.PROFILE}
          onClick={handleProfileClick}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem
          selected={pathName == APP_PATH.SETTINGS}
          onClick={handleSettingsClick}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <MenuItem
          selected={pathName == APP_PATH.DASHBOARD}
          onClick={handleDashboardClick} // Handle click for Dashboard
        >
          <ListItemIcon>
            <Dashboard /> {/* Dashboard icon */}
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
export default memo(UserPopover);
