export const APP_PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  VIDEOS: "/videos",
  IMAGES: "/images",
  CREATE_VIDEOS: "/videos/create",
  CREATE_IMAGES: "/images/create",
};

export const AUTH_METHOD = {
  EMAIL: "email",
  GOOGLE: "google",
  FACEBOOK: "facebook",
};

export const localStorageKey = {
  accessToken: "accessToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshToken: "refreshToken",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
};

export const API_RESPONSE_CODE = {
  accessTokenExpired: "ACCESS_TOKEN_EXPIRED",
  invalidAccessToken: "INVALID_ACCESS_TOKEN",
  invalidRefreshToken: "INVALID_REFRESH_TOKEN",
};

export const APP_NAME = "GTL Studio";
