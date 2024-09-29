import { createSlice } from "@reduxjs/toolkit";

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
type ImagePromptFilter = {
  width: number;
  // TODO: more
};

/**
 * Represents one single prompt
 */
type ImagePrompt = {
  // TODO: the definition against the API
};

type ImageSliceState = {
  model: ImageModel;
  filter: ImagePromptFilter;
  // TODO: more
  /**
   * Image prompts to be retrieved and then stored as the SPA loads in the
   * memory
   */
  prompts: ImagePrompt[];
};

const initialState: ImageSliceState = {
  model: ImageModel.Animate,
  filter: {
    width: 0,
  },
  prompts: [],
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

    clearState(state, action) {
      return {
        ...initialState,
      };
    },
  },
});

export default slice.reducer;
export const imageSliceActions = slice.actions;
