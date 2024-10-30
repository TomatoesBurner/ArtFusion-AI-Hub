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
  IImageModel,
  imageModelList,
  imageSliceActions,
} from "@/store/slices/imagesSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { APP_PATH } from "@/utils/constant";
import Image from "next/image";

const Page = () => {
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
        {imageModelList.map((model, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              component={Box}
              sx={{ cursor: "pointer" }}
              onClick={() => handleImageModelSelect(model)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${model.img}`}
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

export default Page;
