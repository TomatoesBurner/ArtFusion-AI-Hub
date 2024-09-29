import { createSlice } from "@reduxjs/toolkit";

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

/**
 * The filters that users can set in the vidoe prompt page
 */
type VideoPromptFilter = {
  width: number;
  // TODO: more
};

/**
 * Represents one single prompt
 */
type VideoPrompt = {
  // TODO: the definition against the API
};

type VideoSliceState = {
  model: VideoModel;
  filter: VideoPromptFilter;
  // TODO: more
  /**
   * Video prompts to be retrieved and then stored as the SPA loads in the
   * memory
   */
  prompts: VideoPrompt[];
};

const initialState: VideoSliceState = {
  model: VideoModel.NaturalScenery,
  filter: {
    width: 0,
  },
  prompts: [],
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

    clearState(state, action) {
      return {
        ...initialState,
      };
    },
  },
});

export default slice.reducer;
export const videoSliceActions = slice.actions;
