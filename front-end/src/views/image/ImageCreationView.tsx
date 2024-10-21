"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import ImageInputFilter from "@/components/creation/ImageInputFilter";
import { APP_BAR_HEIGHT } from "@/utils/constant";
import PromptSubmitBox from "@/components/Common/PromptSubmitBox/PromptSubmitBox";
import withImagePromptCreate from "@/hoc/withImagePromptCreate";
import ImageChatList from "@/components/creation/ImageChatList";

const ImagePromptSubmitBox = withImagePromptCreate(PromptSubmitBox);

const ImageCreationView = () => {
  return (
    <Grid
      container
      p={2}
      spacing={2}
      height={`calc(100vh - ${APP_BAR_HEIGHT})`}
    >
      {/* Left: filter */}
      <Grid item xs={3} height={"100%"} display={"flex"}>
        <ImageInputFilter />
      </Grid>

      {/* Right */}
      <Grid
        item
        xs={9}
        height={"100%"}
        display={"flex"}
        direction={"column"}
        gap={2}
      >
        {/* Image chat history */}
        <Box width={"100%"} flexGrow={1} overflow={"hidden"}>
          <ImageChatList />
        </Box>

        {/* Prompt box */}
        <Box>
          <ImagePromptSubmitBox />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImageCreationView;
