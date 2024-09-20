"use client";

import { APP_NAME, APP_PATH } from "@/utils/constant";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";

const DashBoardAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link href="/">
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
