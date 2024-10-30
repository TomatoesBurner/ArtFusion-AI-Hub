import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";
import createPalette, {
  PaletteColor,
  SimplePaletteColorOptions,
} from "@mui/material/styles/createPalette";
import { getBaseTypographyOverrides } from "./typographyOverride";

export const appColours = {
  cLightBlue: "#3d86e8",
  cGold: "#ceb559",
  cBlueGrey: "#65778f",
  cWhiteGrey: "#edf0f2",
  // Darker ones
  cGrey: "#898989",
  cGreyBlack: "#212121",
  cBlack: "#161717",
  // Other
  cBaseBgLight: "#161717",
  cBaseBgDark: "#161717",
};

export const appColourKeys = Object.keys(appColours);

export type MuiThemeMode = "dark" | "light";

const getAugmentAppColours = () => {
  const palette = createPalette({});

  const argumentedAppColours: {
    [key: string]: PaletteColor;
  } = {};

  Object.keys(appColours).forEach((key) => {
    argumentedAppColours[key] = palette.augmentColor({
      color: {
        main: appColours[key as keyof typeof appColours],
      },
      name: key,
    });
  });

  return argumentedAppColours;
};

const getBasePalette = (mode: MuiThemeMode): Palette => {
  const palette = createPalette({ mode: mode });

  const argumentedAppColours: {
    [key: string]: PaletteColor;
  } = {};

  Object.keys(appColours).forEach((key) => {
    argumentedAppColours[key] = palette.augmentColor({
      color: {
        main: appColours[key as keyof typeof appColours],
      },
      name: key,
    });
  });

  return createPalette({ mode: mode, ...argumentedAppColours });
};

const getLightPaletteOptions = (): PaletteOptions => {
  const lightPalette: PaletteOptions = {
    background: {
      default: appColours.cWhiteGrey,
      // paper: appColours.cWhiteGrey,
    },
  };

  return {
    mode: "light",
    ...getAugmentAppColours(),
    ...lightPalette,
  };
};

const getLightPalette = (): Palette => {
  return createPalette(getLightPaletteOptions());
};

const getDarkPaletteOptions = (): PaletteOptions => {
  const darkPalette: PaletteOptions = {
    background: {
      default: appColours.cBlack,
      paper: appColours.cGreyBlack,
    },
  };

  return {
    mode: "dark",
    ...getAugmentAppColours(),
    ...darkPalette,
  };
};

const getDarkPalette = (): Palette => {
  // return createPalette({ ...basePalette, ...darkPalette });
  return createPalette(getDarkPaletteOptions());
};

const createMuiTheme = (mode: MuiThemeMode) => {
  if (mode === "dark") {
    return createTheme({
      palette: getDarkPaletteOptions(),
      typography: getBaseTypographyOverrides(),
    });
  } else {
    return createTheme({
      palette: getLightPaletteOptions(),
    });
  }
};

const getMuiTheme = (mode: MuiThemeMode) => {
  return createMuiTheme(mode);
};

export default getMuiTheme;
