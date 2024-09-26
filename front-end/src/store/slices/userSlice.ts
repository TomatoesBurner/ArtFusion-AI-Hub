import { UserMeDto } from "@/dtos/UserMeDto";
import { MuiThemeMode } from "@/themes/theme";
import { createSlice } from "@reduxjs/toolkit";

type UserSliceState = UserMeDto;

const initialState: UserSliceState = {
  id: "",
  userId: "",
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  themeMode: "dark",
  joinedAt: "",
  registerMethod: "",
  imagePromptSpaceId: "",
  videoPromptSpaceId: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      const { themeMode } = action.payload;
      state.themeMode = themeMode;
    },

    setUser(state, action: { payload: { user: UserMeDto } }) {
      return {
        ...action.payload.user,
      };
    },

    clearState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export default slice.reducer;
export const userSliceActions = slice.actions;
