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
import { ImageModel, imageSliceActions } from "@/store/slices/imagesSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { APP_PATH } from "@/utils/constant";

interface IImageModel {
  title: string;
  value: ImageModel;
  img: string;
}

const models: IImageModel[] = [
  { title: "Animate", value: ImageModel.Animate, img: "/images/animate.png" },
  {
    title: "Abstract art",
    value: ImageModel.AbstractArt,
    img: "/images/abstract.png",
  },
  {
    title: "Oil painting style",
    value: ImageModel.OilPaintingStyle,
    img: "/images/oil.png",
  },
  { title: "Sketch", value: ImageModel.Sketch, img: "/images/sketch.png" },
  {
    title: "Cyberpunk",
    value: ImageModel.Cyberpunk,
    img: "/images/cyberpunk.png",
  },
  {
    title: "Retro style",
    value: ImageModel.RetroStyle,
    img: "/images/retro.png",
  },
  {
    title: "Rococo style",
    value: ImageModel.RococoStyle,
    img: "/images/rococo.png",
  },
  { title: "Realism", value: ImageModel.Realism, img: "/images/realism.png" },
];
const ImageModels = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleImageModelSelect = (mode: IImageModel) => {
    dispatch(imageSliceActions.setModel({ model: mode.value }));
    router.push(APP_PATH.CREATE_IMAGES);
  };

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Image Models
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {models.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              component={Box}
              sx={{ cursor: "pointer" }}
              onClick={() => handleImageModelSelect(model)}
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
