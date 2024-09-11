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
import { VideoModel, videoSliceAtions } from "@/store/slices/videosSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/utils/constant";

interface IModel {
  title: string;
  value: VideoModel;
  img: string;
}

const models: IModel[] = [
  {
    title: "Natural scenery",
    value: VideoModel.NaturalScenery,
    img: "/images/ns.gif",
  },
  {
    title: "Fantasy style",
    value: VideoModel.FantasyStyle,
    img: "/images/fs.gif",
  },
  {
    title: "Abstract art",
    value: VideoModel.AbstractArt,
    img: "/images/aa.gif",
  },
  {
    title: "Kaleidoscope",
    value: VideoModel.Kaleidoscope,
    img: "/images/ka.gif",
  },
  {
    title: "Realistic animation",
    value: VideoModel.RealisticAnimation,
    img: "/images/ra.gif",
  },
  { title: "Pixel art", value: VideoModel.PixelArt, img: "/images/pa.gif" },
  {
    title: "Experimental art",
    value: VideoModel.ExperimentalArt,
    img: "/images/ea.gif",
  },
  {
    title: "Vintage style",
    value: VideoModel.VintageStyle,
    img: "/images/vs.gif",
  },
];

const ImageModels = () => {
  const selectedModel = useSelector((state: RootState) => state.videos.model);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleModelSelect = (model: IModel) => {
    dispatch(videoSliceAtions.setModel({ model: model.value }));
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
        {models.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              component={Box}
              sx={{ cursor: "pointer" }}
              onClick={() => handleModelSelect(model)}
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
