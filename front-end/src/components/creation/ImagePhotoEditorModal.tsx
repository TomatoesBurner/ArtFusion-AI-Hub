import { ImageApi } from "@/api/imageApi";
import { CreateArgumentImagePromptResponseDto } from "@/dtos/CreateArgumentImagePromptResponseDto";
import { Close, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ModalProps,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { usePhotoEditor } from "react-photo-editor";

export type ImagePhotoEditorModalProps = {
  image: File | undefined;
  ipsId: string;
  ipId: string;
} & Omit<ModalProps, "children">;

const ImagePhotoEditorModal = ({
  image,
  ipsId,
  ipId,
  onClose,
  ...others
}: ImagePhotoEditorModalProps) => {
  const {
    mutate: createArgumentImagePromptMutate,
    isPending: createArgumentImagePromptIsPending,
  } = useMutation({
    mutationKey: ["createArgumentImagePrompt"],
    mutationFn: ImageApi.createNewFilteredImage,
  });

  const {
    canvasRef,
    imageSrc,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturate,
    setSaturate,
    grayscale,
    setGrayscale,
    rotate,
    setRotate,
    flipHorizontal,
    setFlipHorizontal,
    flipVertical,
    setFlipVertical,
    zoom,
    setZoom,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleWheel,
    downloadImage,
    resetFilters,
  } = usePhotoEditor({ file: image });

  const handleClose = () => {
    if (onClose) {
      onClose({}, "backdropClick");
    }
  };

  const handleSave = () => {
    canvasRef.current?.toBlob((blob) => {
      const createArgumentImageFilterDto: CreateArgumentImagePromptResponseDto =
        {
          filters: {
            brightness: brightness,
            contrast: contrast,
            saturate: saturate,
            grayscale: grayscale,
            rotate: rotate,
            zoom: zoom,
            flipHorizontal: flipHorizontal,
            flipVertical: flipVertical,
          },
          extension: "png",
        };

      createArgumentImagePromptMutate(
        {
          ipsId: ipsId,
          ipId: ipId,
          input: createArgumentImageFilterDto,
        },
        {
          onSuccess: (data) => {
            axios
              .put(data.data.uploadUrl, blob, {
                headers: {
                  "Content-Type": "image/png",
                },
              })
              .then((res) => {
                enqueueSnackbar("Image saved successfully", {
                  variant: "success",
                });
              })
              .catch(() => {
                enqueueSnackbar("Failed to save image", { variant: "error" });
              });
            handleClose();
          },
          onError: () => {
            enqueueSnackbar("Failed to save image", { variant: "error" });
          },
        }
      );
    });
  };

  return (
    <Dialog maxWidth="lg" {...others}>
      <DialogTitle>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">Image Editor</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid container gap={2}>
          <Grid item>
            {imageSrc && (
              <Box className="canvas-container">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handlePointerDown}
                  onMouseMove={handlePointerMove}
                  onMouseUp={handlePointerUp}
                  onWheel={handleWheel}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={"auto"}>
            <Box className="controls" width={"200px"}>
              <Typography gutterBottom>Brightness: {brightness}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={200}
                value={brightness}
                onChange={(e, value) => setBrightness(value as number)}
              />

              <Typography gutterBottom>Contrast: {contrast}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={200}
                value={contrast}
                onChange={(e, value) => setContrast(value as number)}
              />

              <Typography gutterBottom>Saturate: {saturate}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={200}
                value={saturate}
                onChange={(e, value) => setSaturate(value as number)}
              />

              <Typography gutterBottom>Grayscale: {grayscale}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={100}
                value={grayscale}
                onChange={(e, value) => setGrayscale(value as number)}
              />

              <Typography gutterBottom>Rotate: {rotate}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotate}
                onChange={(e, value) => setRotate(value as number)}
              />

              <Typography gutterBottom>Zoom: {zoom}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0.1}
                step={0.1}
                max={3}
                value={zoom}
                onChange={(e, value) => setZoom(value as number)}
              />

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Flip Horizontal:</Typography>
                <Switch
                  checked={flipHorizontal}
                  onChange={(e) => setFlipHorizontal(e.target.checked)}
                />
              </Stack>

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Flip Vertical:</Typography>
                <Switch
                  checked={flipVertical}
                  onChange={(e) => setFlipVertical(e.target.checked)}
                />
              </Stack>

              <Button
                fullWidth
                startIcon={<RestartAlt />}
                onClick={() => resetFilters()}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          mx={1}
          mb={1}
        >
          <Button variant="contained" color="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePhotoEditorModal;
