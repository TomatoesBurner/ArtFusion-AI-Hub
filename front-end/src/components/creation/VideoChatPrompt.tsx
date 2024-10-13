import { VideoPromptDto } from "../../dtos/VideoPromptDto";
import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

export const videoChatPromptVideoMaxHeight: number = 200;
export const videoChatPromptMessageMaxHeight: number = 300;
export const estimateVideoChatPromptHeight: number =
  videoChatPromptVideoMaxHeight + videoChatPromptMessageMaxHeight + 20;

export type VideoChatPromptProps = {
  prompt: VideoPromptDto;
};

const VideoChatPrompt = ({ prompt }: VideoChatPromptProps) => {
  const { input, response } = prompt;

  return (
    <Stack mt={2}>
      <Box
        bgcolor={"background.default"}
        p={2}
        borderRadius={4}
        ml={"auto"}
        width={"20%"}
        overflow={"hidden"}
        maxHeight={`${videoChatPromptMessageMaxHeight}px`}
      >
        <Typography
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          textAlign={"right"}
        >
          {input.message}
        </Typography>
      </Box>

      <Box bgcolor={"background.default"} p={2} borderRadius={4} width={"60%"}>
        <Box maxHeight={`${videoChatPromptVideoMaxHeight}px`}>
          <video
            src={response.videoUrl || ""}
            height={0}
            width={0}
            style={{
              height: `${videoChatPromptVideoMaxHeight}px`,
              width: "auto",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default memo(VideoChatPrompt);
