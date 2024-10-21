import { createSlice } from "@reduxjs/toolkit";
import {
  ArgumentImagePromptResponseDto,
  ImagePromptDto,
  ImagePromptInputFilterDto,
} from "@/dtos/ImagePromptDto";
import { aspectRatios, ImageModel } from "@/utils/constant";
import { PaginationResponseDto } from "@/dtos/PaginationResponseDto";

// TODO: decide where this really comes from

export interface IImageModel {
  title: string;
  value: ImageModel;
  img: string;
}

export const imageModelList: IImageModel[] | never = [
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

    addArgumentImageToImagePrompt(
      state,
      action: {
        payload: {
          ipId: string;
          argumentImage: ArgumentImagePromptResponseDto;
        };
      }
    ) {
      const { ipId, argumentImage } = action.payload;
      const imagePrompt = state.prompts.find((ip) => ip.id === ipId);

      if (imagePrompt) {
        imagePrompt.argumentResponses.push(argumentImage);
      }
    },

    deleteImagePrompt(state, action: { payload: { ipId: string } }) {
      const { ipId } = action.payload;
      state.prompts = state.prompts.filter((ip) => ip.id !== ipId);
    },

    clearState() {
      return initialState;
    },
  },
});

export default slice.reducer;
export const imageSliceActions = slice.actions;
