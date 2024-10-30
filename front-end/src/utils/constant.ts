export enum ImageModel {
  Animate = "animate",
  AbstractArt = "abstract_art",
  OilPaintingStyle = "oil_painting_style",
  Sketch = "sketch",
  Cyberpunk = "cyberpunk",
  RetroStyle = "retro_style",
  RococoStyle = "rococo_style",
  Realism = "realism",
}

export const APP_PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  VIDEOS: "/videos",
  IMAGES: "/images",
  CREATE_VIDEOS: "/videos/create",
  CREATE_IMAGES: "/images/create",
  IMAGE_MODELS: "/images/models",
  VIDEO_MODELS: "/videos/models",
  SETTINGS: "/settings",
  PROFILE: "/settings/profile",
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
  REQUIRE_TWO_FACTOR: "REQUIRE_TWO_FACTOR",
};

export const aspectRatios = [
  "16:9",
  "4:3",
  "1:1",
  "3:4",
  "9:16",
  "9:18",
  "1:2",
  "2:1",
  "3:2",
  "4:5",
  "5:4",
];

export const APP_NAME = "GTL Studio";
export const APP_BAR_HEIGHT = "64px";

export interface IImageModel {
  title: string;
  value: ImageModel;
  img: string;
}

export const imageModelList: IImageModel[] = [
  { title: "Animate", value: ImageModel.Animate, img: "/images/animate.png" },
  {
    title: "Abstract art",
    value: ImageModel.AbstractArt,
    img: "/images/abstract.png",
  },
  {
    title: "Oil painting style",
    value: ImageModel.OilPaintingStyle,
    img: "/images/oil.png",
  },
  { title: "Sketch", value: ImageModel.Sketch, img: "/images/sketch.png" },
  {
    title: "Cyberpunk",
    value: ImageModel.Cyberpunk,
    img: "/images/cyberpunk.png",
  },
  {
    title: "Retro style",
    value: ImageModel.RetroStyle,
    img: "/images/retro.png",
  },
  {
    title: "Rococo style",
    value: ImageModel.RococoStyle,
    img: "/images/rococo.png",
  },
  { title: "Realism", value: ImageModel.Realism, img: "/images/realism.png" },
];
