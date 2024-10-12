import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageSliceActions } from "../../store/slices/imagesSlice";
import {
  Slider,
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { RootState } from "@/store/store";
import SlideAndTextField from "../Common/SliderAndTextField/SlideAndTextField";
import { aspectRatios } from "@/utils/constant";

const ImageInputFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.images.filter);

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

  return (
    <Paper component={Box} p={2} width={"100%"}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filters
      </Typography>
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
