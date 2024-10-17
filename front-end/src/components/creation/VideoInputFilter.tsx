import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videoSliceActions } from "../../store/slices/videosSlice";
import {
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  CardMedia,
  Tooltip,
} from "@mui/material";
import { RootState } from "@/store/store";
import SlideAndTextField from "../Common/SliderAndTextField/SlideAndTextField";
import NextLink from "next/link";
import { videoModelList } from "@/app/(dashboard)/videos/models/page";
import { APP_PATH } from "@/utils/constant";

const VideoInputFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.videos.filter);
  const videoModel = useSelector((state: RootState) => state.videos.model);

  const handlesamplingStepsChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({
        filter: { ...filter, samplingSteps: value },
      })
    );
  };

  const handleWidthChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({ filter: { ...filter, width: value } })
    );
  };

  const handleHeightChange = (value: number) => {
    dispatch(
      videoSliceActions.setFilter({ filter: { ...filter, height: value } })
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

  const videoModelData = videoModelList.find(
    (model) => model.value === videoModel
  );

  return (
    <Paper component={Box} p={2} width={"100%"} overflow={"scroll"}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Filters
      </Typography>

      {videoModelData && (
        <Box mb={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1}
          >
            <Tooltip title={`Model: ${videoModelData.title}`}>
              <Typography
                variant="subtitle1"
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                noWrap
              >
                Model: {videoModelData.title}
              </Typography>
            </Tooltip>

            <Button
              fullWidth
              LinkComponent={NextLink}
              href={APP_PATH.VIDEO_MODELS}
              color="cGold"
            >
              {"Select New Model >"}
            </Button>
          </Stack>
          <CardMedia
            component="img"
            sx={{
              animationPlayState: "paused",
            }}
            height="200"
            image={videoModelData.img}
            alt={videoModelData.title}
          />
        </Box>
      )}

      <SlideAndTextField
        label={" SamplingSteps"}
        value={filter.samplingSteps || 0}
        min={1}
        max={60}
        onChange={handlesamplingStepsChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"CfgScale"}
        value={filter.cfgScale || 0}
        min={1}
        max={30}
        step={0.5}
        onChange={handleCfgScaleChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"Eta"}
        value={filter.eta || 0}
        min={0}
        max={1.0}
        step={0.1}
        onChange={handleEtaChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"Fps"}
        value={filter.fps || 0}
        min={8}
        max={32}
        onChange={handleFpsChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"width"}
        value={filter.width || 0}
        min={100}
        max={1920}
        onChange={handleWidthChange}
      ></SlideAndTextField>

      <SlideAndTextField
        label={"heigth"}
        value={filter.height || 0}
        min={100}
        max={1080}
        onChange={handleHeightChange}
      ></SlideAndTextField>
    </Paper>
  );
};

export default memo(VideoInputFilter);
