import { createSlice } from "@reduxjs/toolkit";
import {
  ImagePromptDto,
  ImagePromptInputFilterDto,
} from "@/dtos/ImagePromptDto";
import { aspectRatios } from "@/utils/constant";
import { PaginationResponseDto } from "@/dtos/PaginationResponseDto";

// TODO: decide where this really comes from
export enum ImageModel {
  Animate = "animate",
  AbstractArt = "abstract_art",
  OilPaintingStyle = "oil_painting_style",
  Sketch = "sketch",
  Cyberpunk = "cyberpunk",
  RetroStyle = "retro_style",
  RococoStyle = "rococo_style",
  Realism = "realism",
}

/**
 * Represent the filter type that user can set in the image prompt page
 */
type ImagePromptFilter = ImagePromptInputFilterDto;

/**
 * Represents one single prompt
 */
type ImagePrompt = ImagePromptDto;

type ImageSliceState = {
  model: ImageModel;
  filter: ImagePromptFilter;
  // TODO: more
  prompts: ImagePrompt[];
  hasNextPage: boolean;
  cursor: string | null;
};

const initialState: ImageSliceState = {
  model: ImageModel.Animate,
  filter: {
    width: 540,
    height: 540,
    aspectRatio: aspectRatios[0],
    dpi: 300,
  },
  prompts: [],
  hasNextPage: false,
  cursor: null,
};

const slice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setModel(state, action: { payload: { model: ImageModel } }) {
      const { model } = action.payload;
      state.model = model;
    },

    setFilter(state, action: { payload: { filter: ImagePromptFilter } }) {
      const { filter } = action.payload;
      state.filter = {
        ...state.filter,
        ...filter,
      };
    },

    addPrompts(state, action: { payload: { prompts: ImagePrompt[] } }) {
      state.prompts = [...state.prompts, ...action.payload.prompts];
    },

    addPromptToFront(state, action: { payload: { prompt: ImagePrompt } }) {
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
export const imageSliceActions = slice.actions;
