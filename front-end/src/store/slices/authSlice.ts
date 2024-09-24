import { TokenDto } from "@/dtos/TokenDto";
import { createSlice } from "@reduxjs/toolkit";

type AuthSliceState = {
  initalised: boolean;
  userId: string | null;
  accessToken: TokenDto | null;
  refreshToken: TokenDto | null;
};

const initialState: AuthSliceState = {
  initalised: false,
  userId: null,
  accessToken: null,
  refreshToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialised: (state, action: { payload: { initialised: boolean } }) => {
      const { initialised } = action.payload;
      state.initalised = initialised;
    },
    setUserId: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload;
      state.userId = userId;
    },
    setAccessToken: (state, action: { payload: { accessToken: TokenDto } }) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setRefreshToken: (
      state,
      action: { payload: { refreshToken: TokenDto } }
    ) => {
      const { refreshToken } = action.payload;
      state.refreshToken = refreshToken;
    },
    clearState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export default slice.reducer;
export const authSliceActions = slice.actions;
