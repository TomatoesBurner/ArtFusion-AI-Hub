import { TokenDto } from "@/dtos/TokenDto";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";

type TAuthUser = {
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthSliceState = {
  initialised: boolean;
  loggedIn: boolean;
  user: TAuthUser;
  accessToken: TokenDto | null;
  refreshToken: TokenDto | null;
};

const initialState: AuthSliceState = {
  initialised: false,
  loggedIn: false,
  user: {
    userId: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  accessToken: null,
  refreshToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialised: (state, action: { payload: { initialised: boolean } }) => {
      const { initialised } = action.payload;
      state.initialised = initialised;
    },
    setLoggedIn: (state, action: { payload: { loggedIn: boolean } }) => {
      const { loggedIn } = action.payload;
      state.loggedIn = loggedIn;
    },
    setUser: (state, action: { payload: { user: TAuthUser } }) => {
      const { user } = action.payload;
      state.user = user;
    },
    setUserTokens: (
      state,
      action: {
        payload: {
          accessToken: TokenDto;
          refreshToken: TokenDto;
          userId: string;
        };
      }
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = {
        token: accessToken.token,
        expiresAt: new Date(accessToken.expiresAt).toISOString(),
      };
      state.refreshToken = {
        token: refreshToken.token,
        expiresAt: new Date(refreshToken.expiresAt).toISOString(),
      };
      const payload = jwtDecode(accessToken.token) as JwtPayload & TAuthUser;
      state.user = {
        userId: payload.sub || "",
        name: payload.name || "",
        firstName: payload.firstName || "",
        lastName: payload.lastName || "",
        email: payload.email || "",
      };
    },
    setAccessToken: (state, action: { payload: { accessToken: TokenDto } }) => {
      const { accessToken } = action.payload;
      state.accessToken = {
        token: accessToken.token,
        expiresAt: new Date(accessToken.expiresAt).toISOString(),
      };
    },
    setRefreshToken: (
      state,
      action: { payload: { refreshToken: TokenDto } }
    ) => {
      const { refreshToken } = action.payload;
      state.refreshToken = {
        token: refreshToken.token,
        expiresAt: new Date(refreshToken.expiresAt).toISOString(),
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
export const authSliceActions = slice.actions;
