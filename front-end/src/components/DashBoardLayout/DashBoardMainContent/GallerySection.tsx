import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import { ImageApi, MediaItem } from "@/api/imageApi";
import { VideoApi } from "@/api/videoApi";
import ImageFilterView from "@/views/image/ImageFilterView";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { imageSliceActions } from "@/store/slices/imagesSlice";
import { videoSliceActions } from "@/store/slices/videosSlice";

const GallerySection = ({ ipsId, vpsId }: { ipsId: string; vpsId: string }) => {
  const dispatch = useDispatch();

  const [imageMediaList, setImageMediaList] = useState<MediaItem[]>([]);
  const [videoMediaList, setVideoMediaList] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: imageMediaItems, isFetching: imageMediaItemsFetching } =
    useQuery({
      queryKey: ["getImageMediaItems"],
      queryFn: () => ImageApi.fetchImageMediaItems(ipsId),
    });

  const { data: videoMediaItems, isFetching: videoMedaiaItemsFetching } =
    useQuery({
      queryKey: ["getVideoMediaItems"],
      queryFn: () => VideoApi.fetchVideoMediaItems(vpsId),
    });

  const { mutate: deleteImagePromptMutate } = useMutation({
    mutationKey: ["deleteImagePrompt"],
    mutationFn: ImageApi.deleteImagePrompt,
  });

  const { mutate: deleteVideoPromptMutate } = useMutation({
    mutationKey: ["deleteVideoPrompt"],
    mutationFn: VideoApi.deleteVideoPrompt,
  });

  useEffect(() => {
    setImageMediaList(imageMediaItems || []);
    setVideoMediaList(videoMediaItems || []);
  }, [imageMediaItems, videoMediaItems]);

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
    setModalOpen(true);
  };

  const handleDeleteMedia = (item: MediaItem) => {
    if (!item) return;

    if (item.type === "image") {
      deleteImagePromptMutate(
        {
          ipsId,
          ipId: item.id,
        },
        {
          onSuccess: () => {
            enqueueSnackbar("Image deleted successfully", {
              variant: "success",
            });
            dispatch(
              imageSliceActions.deleteImagePrompt({
                ipId: item.id,
              })
            );
            setImageMediaList((prev) => prev.filter((i) => i.id !== item.id));
          },
          onError: () => {
            enqueueSnackbar("Failed to delete image", {
              variant: "error",
            });
          },
        }
      );
    } else if (item.type === "video") {
      deleteVideoPromptMutate(
        {
          vpsId,
          vpId: item.id,
        },
        {
          onSuccess: () => {
            enqueueSnackbar("Video deleted successfully", {
              variant: "success",
            });
            dispatch(
              videoSliceActions.deleteVideoPrompt({
                vpId: item.id,
              })
            );
            setVideoMediaList((prev) => prev.filter((i) => i.id !== item.id));
          },
          onError: () => {
            enqueueSnackbar("Failed to delete video", {
              variant: "error",
            });
          },
        }
      );
    }
  };

  return (
    <>
      {/* Image Gallery Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 4,
          marginBottom: 3,
          marginTop: 3,
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        {imageMediaItemsFetching && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
          </Stack>
        )}

        {!imageMediaItemsFetching && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Image Workbench
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {imageMediaList.length > 0 ? (
                imageMediaList.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      width: 200,
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => handleMediaClick(item)}
                  >
                    <CardMedia
                      component="img"
                      image={item.url}
                      alt={`Image item ${item.id}`}
                      sx={{ height: 140 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Image
                    </Typography>
                    {/* delete btn */}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMedia(item);
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "red",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))
              ) : (
                <Typography variant="body1">No images found.</Typography>
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Video Gallery Section */}
      <Paper
        elevation={3}
        sx={{ padding: 3, borderRadius: 4, maxHeight: 400, overflowY: "auto" }}
      >
        {videoMedaiaItemsFetching && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
          </Stack>
        )}

        {!videoMedaiaItemsFetching && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Video Gallery
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {videoMediaList.length > 0 ? (
                videoMediaList.map((item) => (
                  <Card
                    key={item.id}
                    sx={{ width: 200, cursor: "pointer", position: "relative" }}
                  >
                    <CardMedia
                      component="video"
                      src={item.url}
                      sx={{ height: 140 }}
                      controls
                    />
                    <Typography variant="body2" color="text.secondary">
                      Video
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMedia(item);
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "red",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))
              ) : (
                <Typography variant="body1">No videos found.</Typography>
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Modal for Image Filtering */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        {selectedMedia && (
          <ImageFilterView
            selectedImage={selectedMedia}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Dialog>
    </>
  );
};

export default GallerySection;
