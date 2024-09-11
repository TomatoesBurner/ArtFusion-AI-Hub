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

type VideoSliceState = {
  model: VideoModel;
  filter: {
    width: number;
  };
  // TODO: more
};

const initialState: VideoSliceState = {
  model: VideoModel.NaturalScenery,
  filter: {
    width: 0,
  },
};

const slice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setModel(state, action: { payload: { model: VideoModel } }) {
      const { model } = action.payload;
      state.model = model;
    },
  },
});

export default slice.reducer;
export const videoSliceAtions = slice.actions;
