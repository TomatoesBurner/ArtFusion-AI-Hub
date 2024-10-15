"use client";

import { APP_PATH } from "@/utils/constant";
import { Person, Settings } from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <Container>
      <Grid container padding={2} spacing={2}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <ListItem disableGutters>
              <ListItemButton
                selected={pathName == APP_PATH.SETTINGS}
                onClick={() => handleNavClick(APP_PATH.SETTINGS)}
                sx={{ padding: "4px 16px" }}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary={"Settings"}
                  primaryTypographyProps={{ fontSize: "18px" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disableGutters>
              <ListItemButton
                selected={pathName == APP_PATH.PROFILE}
                onClick={() => handleNavClick(APP_PATH.PROFILE)}
                sx={{ padding: "4px 16px" }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText
                  primary={"Profile"}
                  primaryTypographyProps={{ fontSize: "18px" }}
                />
              </ListItemButton>
            </ListItem>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsLayout;
