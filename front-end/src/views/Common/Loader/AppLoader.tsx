import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CircleLoader } from "react-spinners";

const AppLoader = () => {
  const theme = useTheme();

  const color = theme.palette.cGold?.main;

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100%"}
    >
      <Box position={"relative"}>
        <CircleLoader size={120} color={color} />
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            priority
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
          ></Image>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLoader;
