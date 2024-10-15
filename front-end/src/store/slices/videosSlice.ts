import { createSlice } from "@reduxjs/toolkit";
import {
  VideoPromptDto,
  VideoPromptInputFilterDto,
} from "@/dtos/VideoPromptDto";
import { PaginationResponseDto } from "@/dtos/PaginationResponseDto";

// TODO: decide where this really comes from
export enum VideoModel {
  NaturalScenery = "natural_scenery",
  FantasyStyle = "fantasy_style",
  AbstractArt = "abstract_art",
  Kaleidoscope = "kaleidoscope",
  RealisticAnimation = "realistic_animation",
  PixelArt = "pixel_art",
  ExperimentalArt = "experimental_art",
  VintageStyle = "vintage_style",
}

type VideoPromptFilter = VideoPromptInputFilterDto;

/**
 * Represents one single prompt
 */
type VideoPrompt = VideoPromptDto;

type VideoSliceState = {
  model: VideoModel;
  filter: VideoPromptFilter;
  // TODO: more
  prompts: VideoPrompt[];
  hasNextPage: boolean;
  cursor: string | null;
};

const initialState: VideoSliceState = {
  model: VideoModel.NaturalScenery,
  filter: {
    eta: 0.8,
    fps: 5,
    cfgScale: 15,
    samplingSteps: 16,
    width: 256,
    height: 256,
  },
  prompts: [],
  hasNextPage: false,
  cursor: null,
};

const slice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setModel(state, action: { payload: { model: VideoModel } }) {
      const { model } = action.payload;
      state.model = model;
    },

    setFilter(state, action: { payload: { filter: VideoPromptFilter } }) {
      const { filter } = action.payload;
      state.filter = {
        ...state.filter,
        ...filter,
      };
    },

    addPrompts(state, action: { payload: { prompts: VideoPrompt[] } }) {
      state.prompts = [...state.prompts, ...action.payload.prompts];
    },

    addPromptToFront(state, action: { payload: { prompt: VideoPrompt } }) {
      state.prompts = [action.payload.prompt, ...state.prompts];
    },

    setPagination(
      state,
      action: { payload: { pagination: PaginationResponseDto } }
    ) {
      const { cursor, hasNext } = action.payload.pagination;
      state.cursor = cursor || null;
      state.hasNextPage = hasNext || false;
    },

    clearState() {
      return initialState;
    },
  },
});

export default slice.reducer;
export const videoSliceActions = slice.actions;
