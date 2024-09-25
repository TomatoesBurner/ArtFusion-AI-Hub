import useAuth from "@/hooks/useAuth";
import { Logout } from "@mui/icons-material";
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
import React, { memo } from "react";

const UserPopover = () => {
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

  const initials = `${user?.firstName[0]}${user?.lastName[0]}`.toUpperCase();

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
