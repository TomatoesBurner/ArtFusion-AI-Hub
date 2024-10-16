import { VideoPromptDto } from "@/dtos/VideoPromptDto";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { PromptBox } from "./ImageChatPrompt";
import { DeleteOutline } from "@mui/icons-material";
import { VideoApi } from "@/api/videoApi";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { videoSliceActions } from "@/store/slices/videosSlice";

export const videoChatPromptVideoMaxHeight: number = 200;
export const videoChatPromptMessageMaxHeight: number = 300;
export const estimateVideoChatPromptHeight: number =
  videoChatPromptVideoMaxHeight + videoChatPromptMessageMaxHeight + 20;

export type VideoChatPromptProps = {
  prompt: VideoPromptDto;
  vpsId: string;
};

const VideoChatPrompt = ({ prompt, vpsId }: VideoChatPromptProps) => {
  const dispatch = useDispatch();
  const { input, response } = prompt;

  const { mutate: deleteVideoPromptMutate } = useMutation({
    mutationKey: ["deleteVideoPrompt"],
    mutationFn: VideoApi.deleteVideoPrompt,
  });

  const handelVideoDelete = () => {
    if (!prompt.id) return;

    deleteVideoPromptMutate(
      {
        vpsId,
        vpId: prompt.id!,
      },
      {
        onSuccess: () => {
          enqueueSnackbar("Video deleted successfully", {
            variant: "success",
          });
          dispatch(
            videoSliceActions.deleteVideoPrompt({
              vpId: prompt.id!,
            })
          );
        },
        onError: () => {
          enqueueSnackbar("Failed to delete video", {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <Stack mt={2}>
      {/* Input message box */}
      <PromptBox
        bgcolor={"background.default"}
        p={2}
        borderRadius={4}
        ml={"auto"}
        width={"20%"}
        overflow={"hidden"}
        display={"flex"}
        minHeight={"40px"}
        justifyContent={"center"}
        alignItems={"center"}
        maxHeight={`${videoChatPromptMessageMaxHeight}px`}
      >
        <Typography
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          textAlign={"right"}
        >
          {input.message}
        </Typography>
        <IconButton
          sx={{
            display: "none",
          }}
          size="small"
          color="error"
          onClick={handelVideoDelete}
        >
          <DeleteOutline />
        </IconButton>
      </PromptBox>

      {/* Video box */}
      <Box bgcolor={"background.default"} p={2} borderRadius={4} width={"60%"}>
        <Box maxHeight={`${videoChatPromptVideoMaxHeight}px`}>
          <video
            src={response.videoUrl || ""} // Video URL
            controls // Add video controls like play/pause
            style={{
              height: `${videoChatPromptVideoMaxHeight}px`, // Keep this height
              width: "100%", // Ensure the video uses full width available
              objectFit: "contain", // Adjust aspect ratio without cropping
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default memo(VideoChatPrompt);
