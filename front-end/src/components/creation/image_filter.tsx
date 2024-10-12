import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageSliceActions } from "../../store/slices/imagesSlice";
import { Slider, Typography, Box } from "@mui/material";

const ImageFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.images.filter);

  const handleWidthChange = (e, newValue) => {
    dispatch(imageSliceActions.setFilter({ filter: { width: newValue } }));
  };

  const handleHeightChange = (e, newValue) => {
    dispatch(imageSliceActions.setFilter({ filter: { height: newValue } }));
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ color: "#fff" }}>
        Width
      </Typography>
      <Slider
        value={filter.width}
        onChange={handleWidthChange}
        min={100}
        max={1920}
      />

      <Typography variant="body2" sx={{ color: "#fff" }}>
        Height
      </Typography>
      <Slider
        value={filter.height}
        onChange={handleHeightChange}
        min={100}
        max={1080}
      />
    </Box>
  );
};

export default ImageFilter;
