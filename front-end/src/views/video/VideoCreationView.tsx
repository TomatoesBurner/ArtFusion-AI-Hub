"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import VideoInputFilter from "@/components/creation/VideoInputFilter";
import { APP_BAR_HEIGHT } from "@/utils/constant";
import PromptSubmitBox from "@/components/Common/PromptSubmitBox/PromptSubmitBox";
import VideoChatList from "@/components/creation/videoChatlist";
import withVideoPromptCreate from "@/hoc/withVideoPromptCreate";

const VideoPromptSubmitBox = withVideoPromptCreate(PromptSubmitBox);

const VideoCreationView = () => {
  return (
    <Grid
      container
      p={2}
      spacing={2}
      height={`calc(100vh - ${APP_BAR_HEIGHT})`}
    >
      {/* Left: filter */}
      <Grid item xs={3} height={"100%"} display={"flex"}>
        <VideoInputFilter />
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
          <VideoChatList />
        </Box>

        {/* Prompt box */}
        <Box>
          <VideoPromptSubmitBox />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VideoCreationView;
