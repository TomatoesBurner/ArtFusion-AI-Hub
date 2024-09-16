import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import imagesReducer from "./slices/imagesSlice";
import videosReducer from "./slices/videoSlice";

const reducer = combineReducers({
  user: userReducer,
  images: imagesReducer,
  videos: videosReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;