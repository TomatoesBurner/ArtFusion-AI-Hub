"use client";

import { APP_NAME, APP_PATH } from "@/utils/constant";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

const DashBoardAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Image src="/images/Logo.png" alt="Logo" width={48} height={48}></Image>
        <Typography ml={1} variant="h6">
          {APP_NAME}
        </Typography>
        <Stack flexGrow={1}></Stack>
        <Button
          LinkComponent={NextLink}
          variant="outlined"
          href={APP_PATH.LOGIN}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashBoardAppBar;
