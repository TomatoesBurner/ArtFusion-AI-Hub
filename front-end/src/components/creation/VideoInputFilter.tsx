import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoSliceActions } from "../../store/slices/videosSlice";
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

const VideoInputFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.videos.filter);

  const handlesamplingStepsChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({
        filter: { ...filter, samplingSteps: value },
      })
    );
  };

  const handleEtaChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({ filter: { ...filter, eta: value } })
    );
  };

  const handleFpsChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({ filter: { ...filter, fps: value } })
    );
  };

  const handleCfgScaleChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({ filter: { ...filter, cfgScale: value } })
    );
  };

  return (
    <Paper component={Box} p={2} width={"100%"}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filters
      </Typography>
      <SlideAndTextField
        label={" SamplingSteps"}
        value={filter.samplingSteps || 0}
        min={1}
        max={10}
        onChange={handlesamplingStepsChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"CfgScale"}
        value={filter.cfgScale || 0}
        min={1}
        max={10}
        onChange={handleCfgScaleChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"Eta"}
        value={filter.eta || 0}
        min={1}
        max={10}
        onChange={handleEtaChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"Fps"}
        value={filter.fps || 0}
        min={1}
        max={10}
        onChange={handleFpsChange}
      ></SlideAndTextField>
    </Paper>
  );
};

export default memo(VideoInputFilter);
