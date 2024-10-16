import {
  ArgumentImagePromptResponseDto,
  ImagePromptDto,
} from "@/dtos/ImagePromptDto";
import { Close, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ModalProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { PromptImage } from "./ImageChatPromptImages";
import { useQuery } from "@tanstack/react-query";
import { ImageDto, imageUtils } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const InfoList = styled(List)(({ theme }) => ({
  padding: 0,
  width: "100%",
}));

const InfoListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export type ImageViewModalProps = {
  imageUrl: string;
  imagePrompt: ImagePromptDto;
  argumentImage: ArgumentImagePromptResponseDto | null;
} & Omit<ModalProps, "children">;

const ImageViewModal = ({
  imageUrl,
  imagePrompt,
  argumentImage,
  onClose,
  ...others
}: ImageViewModalProps) => {
  const { isFetching: getImageBlobFetching, refetch: getImageBlobRefetch } =
    useQuery({
      queryKey: ["getImageBlob"],
      queryFn: () => imageUtils.getImageAsBlob(imageUrl),
      enabled: false,
      retry: false,
    });

  const handleClose = () => {
    if (onClose) {
      onClose({}, "backdropClick");
    }
  };

  const handleImageDownload = async () => {
    const blob = await getImageBlobRefetch();
    if (blob.data) {
      const imageData = argumentImage || imagePrompt;
      saveAs(
        blob.data,
        imageUtils.getImageNameFromImageDto(imageData as ImageDto)
      );
    }
  };

  const { input: ipInput, response: ipresponse } = imagePrompt;
  const { filters: ipiFilters } = ipInput;
  const aiFilters = argumentImage?.filters;

  return (
    <Dialog
      maxWidth="lg"
      PaperProps={{
        sx: { height: "100%" },
      }}
      {...others}
      sx={{ height: "100%" }}
    >
      <DialogTitle>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">{imagePrompt.input.message}</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ height: "100%" }}>
        <Stack direction={"row"} height={"100%"}>
          <PromptImage src={imageUrl} />
          <Stack width={"100%"} px={2}>
            <Box ml={2} minWidth={"200px"} width={"100%"}>
              <Box>
                <Typography variant="h6">Filters:</Typography>
                <InfoList>
                  <InfoListItem>
                    <Typography variant="body1">Aspect Ratio:</Typography>
                    <Typography variant="body2">
                      {ipiFilters.aspectRatio}
                    </Typography>
                  </InfoListItem>

                  <InfoListItem>
                    <Typography variant="body1">Width:</Typography>
                    <Typography variant="body2">{ipiFilters.width}</Typography>
                  </InfoListItem>

                  <InfoListItem>
                    <Typography variant="body1">Height:</Typography>
                    <Typography variant="body2">{ipiFilters.height}</Typography>
                  </InfoListItem>

                  <InfoListItem>
                    <Typography variant="body1">Dpi:</Typography>
                    <Typography variant="body2">{ipiFilters.dpi}</Typography>
                  </InfoListItem>
                </InfoList>
              </Box>

              {aiFilters && (
                <Box mt={2}>
                  <Typography variant="h6">Image Edits</Typography>
                  <InfoList>
                    <InfoListItem>
                      <Typography variant="body1">Brightness:</Typography>
                      <Typography variant="body2">
                        {aiFilters.brightness}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Contrast:</Typography>
                      <Typography variant="body2">
                        {aiFilters.contrast}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Saturate:</Typography>
                      <Typography variant="body2">
                        {aiFilters.saturate}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Grayscale:</Typography>
                      <Typography variant="body2">
                        {aiFilters.grayscale}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Rotate:</Typography>
                      <Typography variant="body2">
                        {aiFilters.rotate}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Zoom:</Typography>
                      <Typography variant="body2">{aiFilters.zoom}</Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Flip Horizontal:</Typography>
                      <Typography variant="body2">
                        {`${Boolean(aiFilters.flipHorizontal)}`}
                      </Typography>
                    </InfoListItem>

                    <InfoListItem>
                      <Typography variant="body1">Flip Vertical:</Typography>
                      <Typography variant="body2">
                        {`${Boolean(aiFilters.flipVertical)}`}
                      </Typography>
                    </InfoListItem>
                  </InfoList>
                </Box>
              )}
            </Box>

            <Box mt={"auto"} p={2} width={"100%"}>
              <Button
                fullWidth
                onClick={handleImageDownload}
                startIcon={<Download />}
              >
                Download
              </Button>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewModal;
