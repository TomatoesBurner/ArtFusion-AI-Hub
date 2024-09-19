import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import imagesReducer from "./slices/imagesSlice";
import videosReducer from "./slices/videosSlice";

export type RootState = ReturnType<typeof store.getState>;

const reducer = combineReducers({
  user: userReducer,
  images: imagesReducer,
  videos: videosReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
