import { createTheme, PaletteOptions } from "@mui/material";

export type MuiThemeMode = "dark" | "light";

const getLightPalette = (): PaletteOptions => {
  return {};
};

const getDarkPalette = (): PaletteOptions => {
  return {};
};

const createMuiTheme = (mode: MuiThemeMode) => {
  if (mode === "dark") {
    return createTheme({
      palette: {
        mode: mode,
        ...getDarkPalette(),
      },
    });
  } else {
    return createTheme({
      palette: {
        mode: mode,
        ...getLightPalette(),
      },
    });
  }
};

const getMuiTheme = (mode: MuiThemeMode) => {
  return createMuiTheme(mode);
};

export default getMuiTheme;
