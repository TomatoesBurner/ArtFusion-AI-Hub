"use client";

import useAuth from "@/hooks/useAuth";
import { APP_NAME, APP_PATH } from "@/utils/constant";
import {
  AppBar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NextLink from "next/link";
import React, { useState } from "react";
import UserPopover from "../UserPopover/UserPopover";
import { usePathname, useRouter } from "next/navigation";
import { pathUtils } from "@/utils/pathUtils";

const { isPathMatch } = pathUtils;

const MenuList = styled(List)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexDirection: "row",
}));

const MenuListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
}));

const MenuListItembutton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(0.5, 1),
  minWidth: "80px",

  "& > .MuiListItemText-root": {
    textAlign: "center",
  },
}));

const DashBoardAppBar = () => {
  const router = useRouter();

  const { loggedIn, user } = useAuth();
  const [imageMenuAnchorEl, setImageMenuAnchorEl] = useState<any>();
  const [videoMenuAnchorEl, setVideoMenuAnchorEl] = useState<any>();

  const pathName = usePathname();

  const navTo = (path: string) => {
    router.push(path);
  };

  const handleMenuPathClick = (path: string) => {
    navTo(path);
    setImageMenuAnchorEl(null);
    setVideoMenuAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
        {/* Left app icon and name */}
        <Link href={APP_PATH.DASHBOARD}>
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={48}
            height={48}
          ></Image>
        </Link>
        <Typography ml={1} variant="h6">
          {APP_NAME}
        </Typography>

        <Stack ml={4}>
          <MenuList>
            <MenuListItem>
              <MenuListItembutton
                selected={isPathMatch(pathName, APP_PATH.IMAGES)}
                onClick={(e) => setImageMenuAnchorEl(e.currentTarget)}
              >
                <ListItemText>Image</ListItemText>
              </MenuListItembutton>
            </MenuListItem>
            <MenuListItem>
              <MenuListItembutton
                selected={isPathMatch(pathName, APP_PATH.VIDEOS)}
                onClick={(e) => setVideoMenuAnchorEl(e.currentTarget)}
              >
                <ListItemText>Video</ListItemText>
              </MenuListItembutton>
            </MenuListItem>
          </MenuList>

          <Menu
            open={Boolean(imageMenuAnchorEl)}
            anchorEl={imageMenuAnchorEl}
            onClose={() => setImageMenuAnchorEl(null)}
          >
            <MenuItem
              selected={isPathMatch(pathName, APP_PATH.IMAGE_MODELS)}
              onClick={() => handleMenuPathClick(APP_PATH.IMAGE_MODELS)}
            >
              Models
            </MenuItem>
            <MenuItem
              selected={isPathMatch(pathName, APP_PATH.CREATE_IMAGES)}
              onClick={() => handleMenuPathClick(APP_PATH.CREATE_IMAGES)}
            >
              Create
            </MenuItem>
          </Menu>

          <Menu
            open={Boolean(videoMenuAnchorEl)}
            anchorEl={videoMenuAnchorEl}
            onClose={() => setVideoMenuAnchorEl(null)}
          >
            <MenuItem
              selected={isPathMatch(pathName, APP_PATH.VIDEO_MODELS)}
              onClick={() => handleMenuPathClick(APP_PATH.VIDEO_MODELS)}
            >
              Models
            </MenuItem>
            <MenuItem
              selected={isPathMatch(pathName, APP_PATH.CREATE_VIDEOS)}
              onClick={() => handleMenuPathClick(APP_PATH.CREATE_VIDEOS)}
            >
              Create
            </MenuItem>
          </Menu>
        </Stack>

        <Box flexGrow={1}></Box>

        {/* Right user icon and popover */}
        {loggedIn && user ? (
          <UserPopover />
        ) : (
          <Button
            LinkComponent={NextLink}
            variant="outlined"
            href={APP_PATH.LOGIN}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashBoardAppBar;
