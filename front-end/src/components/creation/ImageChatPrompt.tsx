import { ImagePromptDto } from "@/dtos/ImagePromptDto";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";
import ImageChatPromptImages from "./ImageChatPromptImages";

export const imageChatPromptImageMaxHeight: number = 200;
export const imageChatPromptMessageMaxHeight: number = 300;
export const estimateImageChatPromptHeight: number =
  imageChatPromptImageMaxHeight + imageChatPromptMessageMaxHeight + 20;

export type ImageChatPromptProps = {
  prompt: ImagePromptDto;
};

const ImageChatPrompt = ({ prompt }: ImageChatPromptProps) => {
  const { input, response } = prompt;

  return (
    <Stack mt={2}>
      <Box
        bgcolor={"background.default"}
        p={2}
        borderRadius={4}
        ml={"auto"}
        maxWidth={"20%"}
        overflow={"hidden"}
        maxHeight={`${imageChatPromptMessageMaxHeight}px`}
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
        <Box height={`${imageChatPromptImageMaxHeight}px`}>
          <ImageChatPromptImages prompt={prompt} />
        </Box>
      </Box>
    </Stack>
  );
};

export default memo(ImageChatPrompt);
