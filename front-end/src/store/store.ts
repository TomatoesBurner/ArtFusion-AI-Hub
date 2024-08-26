import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
