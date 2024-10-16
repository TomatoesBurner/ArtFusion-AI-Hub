import { ImagePromptDto } from "@/dtos/ImagePromptDto";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import React, { memo } from "react";
import ImageChatPromptImages from "./ImageChatPromptImages";
import { DeleteOutline } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { ImageApi } from "@/api/imageApi";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { imageSliceActions } from "@/store/slices/imagesSlice";

export const PromptBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    "& .MuiIconButton-root": {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(-1),
      display: "flex",
    },
  },
}));

export const imageChatPromptImageMaxHeight: number = 200;
export const imageChatPromptMessageMaxHeight: number = 300;
export const estimateImageChatPromptHeight: number =
  imageChatPromptImageMaxHeight + imageChatPromptMessageMaxHeight + 20;

export type ImageChatPromptProps = {
  prompt: ImagePromptDto;
  ipsId: string;
};

const ImageChatPrompt = ({ prompt, ipsId }: ImageChatPromptProps) => {
  const dispatch = useDispatch();
  const { input } = prompt;

  const { mutate: deleteImagePromptMutate } = useMutation({
    mutationKey: ["deleteImagePrompt"],
    mutationFn: ImageApi.deleteImagePrompt,
  });

  const handelImageDelete = () => {
    if (!prompt.id) return;

    deleteImagePromptMutate(
      { ipsId, ipId: prompt.id! },
      {
        onSuccess: () => {
          enqueueSnackbar("Image deleted successfully", {
            variant: "success",
          });
          dispatch(
            imageSliceActions.deleteImagePrompt({
              ipId: prompt.id!,
            })
          );
        },
        onError: () => {
          enqueueSnackbar("Failed to delete image", {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <Stack mt={2}>
      <PromptBox
        bgcolor={"background.default"}
        p={2}
        borderRadius={4}
        ml={"auto"}
        maxWidth={"20%"}
        overflow={"hidden"}
        display={"flex"}
        minHeight={"40px"}
        justifyContent={"center"}
        alignItems={"center"}
        maxHeight={`${imageChatPromptMessageMaxHeight}px`}
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
          onClick={handelImageDelete}
        >
          <DeleteOutline />
        </IconButton>
      </PromptBox>

      <Box bgcolor={"background.default"} p={2} borderRadius={4} width={"60%"}>
        <Box height={`${imageChatPromptImageMaxHeight}px`}>
          <ImageChatPromptImages prompt={prompt} />
        </Box>
      </Box>
    </Stack>
  );
};

export default memo(ImageChatPrompt);
