import { createTheme, PaletteOptions } from "@mui/material";
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

const getBasePalette = (mode: MuiThemeMode): PaletteOptions => {
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

const getLightPalette = (): PaletteOptions => {
  const basePalette = getBasePalette("light");

  const lightPalette: PaletteOptions = {
    background: {
      default: appColours.cWhiteGrey,
      // paper: appColours.cWhiteGrey,
    },
  };

  return createPalette({ ...basePalette, ...lightPalette });
};

const getDarkPalette = (): PaletteOptions => {
  const basePalette = getBasePalette("dark");

  const darkPalette: PaletteOptions = {
    background: {
      default: appColours.cBlack,
      paper: appColours.cGreyBlack,
    },
  };

  return createPalette({ ...basePalette, ...darkPalette });
};

const createMuiTheme = (mode: MuiThemeMode) => {
  if (mode === "dark") {
    return createTheme({
      palette: getDarkPalette(),
      typography: getBaseTypographyOverrides(),
    });
  } else {
    return createTheme({
      palette: getLightPalette(),
    });
  }
};

const getMuiTheme = (mode: MuiThemeMode) => {
  return createMuiTheme(mode);
};

export default getMuiTheme;
