import { MuiThemeMode } from "@/themes/theme";
import { createSlice } from "@reduxjs/toolkit";

type UserSliceState = {
  firstName: string;
  lastName: string;
  email: string;
  themeMode: MuiThemeMode;
};

const initialState: UserSliceState = {
  firstName: "",
  lastName: "",
  email: "",
  themeMode: "dark",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      const { themeMode } = action.payload;
      state.themeMode = themeMode;
    },
  },
});

export default slice.reducer;
