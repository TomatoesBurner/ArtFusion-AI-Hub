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
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NextLink from "next/link";
import React, { useState } from "react";
import UserPopover from "../UserPopover/UserPopover";
import { usePathname, useRouter } from "next/navigation";
import { pathUtils } from "@/utils/pathUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MuiThemeMode } from "@/themes/theme";
import { userSliceActions } from "@/store/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/api/userApi";

const { isPathMatch } = pathUtils;

// Retreived from https://mui.com/material-ui/react-switch
// Date: 17/10/2024
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

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
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const mode: MuiThemeMode = useSelector(
    (state: RootState) => state.user.themeMode
  ) as MuiThemeMode;

  const { loggedIn, user } = useAuth();
  const [imageMenuAnchorEl, setImageMenuAnchorEl] = useState<any>();
  const [videoMenuAnchorEl, setVideoMenuAnchorEl] = useState<any>();

  const pathName = usePathname();

  const { isPending: updateThemePending, mutate: updateThemeMutate } =
    useMutation({
      mutationKey: ["updateTheme"],
      mutationFn: UserApi.updateTheme,
    });

  const navTo = (path: string) => {
    router.push(path);
  };

  const handleMenuPathClick = (path: string) => {
    navTo(path);
    setImageMenuAnchorEl(null);
    setVideoMenuAnchorEl(null);
  };

  const hadleThemeChange = () => {
    const oldMode = mode;
    const newMode = mode === "dark" ? "light" : "dark";

    dispatch(
      userSliceActions.setThemeMode({
        themeMode: newMode,
      })
    );

    updateThemeMutate(
      { theme: newMode },
      {
        onError: () => {
          dispatch(
            userSliceActions.setThemeMode({
              themeMode: oldMode,
            })
          );
        },
      }
    );
  };

  return (
    <AppBar
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? (theme.palette as any)["cGold"].light
            : null,
      }}
    >
      <Toolbar>
        {/* Left app icon and name */}
        <Link href={APP_PATH.DASHBOARD}>
          <Image
            priority
            src="/images/logo.png"
            alt="logo"
            width={48}
            height={48}
            unoptimized
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

        <MaterialUISwitch
          disabled={updateThemePending}
          checked={mode === "dark"}
          onChange={hadleThemeChange}
        />

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
