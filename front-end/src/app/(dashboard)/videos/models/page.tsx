"use client";

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import {
  IVideoModel,
  videoModelList,
  videoSliceActions,
} from "@/store/slices/videosSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/utils/constant";

const ImageModels = () => {
  const selectedModel = useSelector((state: RootState) => state.videos.model);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleVideoModelSelect = (model: IVideoModel) => {
    dispatch(videoSliceActions.setModel({ model: model.value }));
    router.push(APP_PATH.CREATE_VIDEOS);
  };

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Video Models
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {videoModelList.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              component={Box}
              sx={{ cursor: "pointer" }}
              onClick={() => handleVideoModelSelect(model)}
            >
              <CardMedia
                component="img"
                height="200"
                image={model.img}
                alt={model.title}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {model.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageModels;
