import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageSliceActions } from "../../store/slices/imagesSlice";
import {
  Typography,
  Box,
  Paper,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";
import { RootState } from "@/store/store";
import SlideAndTextField from "../Common/SliderAndTextField/SlideAndTextField";
import { APP_PATH, aspectRatios } from "@/utils/constant";
import { imageModelList } from "@/app/(dashboard)/images/models/page";
import NextLink from "next/link";

const ImageInputFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.images.filter);
  const imageModel = useSelector((state: RootState) => state.images.model);

  const handleAspectRatioChange = (event: SelectChangeEvent) => {
    dispatch(
      imageSliceActions.setFilter({
        filter: { aspectRatio: event?.target.value },
      })
    );
  };

  const handleWidthChange = (value: number) => {
    dispatch(imageSliceActions.setFilter({ filter: { width: value } }));
  };

  const handleHeightChange = (value: number) => {
    dispatch(imageSliceActions.setFilter({ filter: { height: value } }));
  };

  const handleDpiChange = (value: number) => {
    dispatch(imageSliceActions.setFilter({ filter: { dpi: value } }));
  };

  const imageModelData = imageModelList.find(
    (model) => model.value === imageModel
  );

  return (
    <Paper component={Box} p={2} width={"100%"}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Filters
      </Typography>

      {imageModelData && (
        <Box mb={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
          >
            <Typography variant="subtitle1">
              Model: {imageModelData.title}
            </Typography>

            <Button
              LinkComponent={NextLink}
              href={APP_PATH.IMAGE_MODELS}
              color="cGold"
            >
              {"Select New Model >"}
            </Button>
          </Stack>
          <CardMedia
            component="img"
            height="200"
            image={imageModelData.img}
            alt={imageModelData.title}
          />
        </Box>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="aspect-ratio">Aspect Ratio</InputLabel>
        <Select
          id="aspect-ratio"
          label="Aspect Ratio"
          value={filter.aspectRatio || aspectRatios[0]}
          defaultValue={aspectRatios[0]}
          onChange={handleAspectRatioChange}
        >
          {aspectRatios.map((aspectRatio) => (
            <MenuItem key={aspectRatio} value={aspectRatio}>
              {aspectRatio}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <SlideAndTextField
        label={"Width"}
        value={filter.width || 0}
        min={100}
        max={1920}
        onChange={handleWidthChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"Height"}
        value={filter.height || 0}
        min={100}
        max={1080}
        onChange={handleHeightChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"DPi"}
        value={filter.dpi || 0}
        min={100}
        max={400}
        onChange={handleDpiChange}
      ></SlideAndTextField>
    </Paper>
  );
};

export default memo(ImageInputFilter);
