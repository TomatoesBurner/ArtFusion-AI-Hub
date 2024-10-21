// import { PaletteColorOptions } from "@mui/material";
import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

// declare module "@mui/material/styles" {
//   interface CustomPalette {
//     cLightBlue: PaletteColorOptions;
//     cGold: PaletteColorOptions;
//     cBlueGrey: PaletteColorOptions;
//     cWhiteGrey: PaletteColorOptions;
//     cGrey: PaletteColorOptions;
//     cGreyBlack: PaletteColorOptions;
//     cBlack: PaletteColorOptions;
//   }
//   interface Palette extends CustomPalette {}
//   interface PaletteOptions extends CustomPalette {}
// }

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    cLightBlue: true;
    cGold: true;
    cBlueGrey: true;
    cWhiteGrey: true;
    cGrey: true;
    cGreyBlack: true;
    cBlack: true;
  }
}

type MuiPaletteColor = {
  light: string;
  main: string;
  dark: string;
};

declare module "@mui/material/styles/createPalette" {
  export interface palette extends MuiPallete {
    cLightBlue?: MuiPaletteColor;
    cGold?: MuiPaletteColor;
    cBlueGrey?: MuiPaletteColor;
    cWhiteGrey?: MuiPaletteColor;
    cGrey?: MuiPaletteColor;
    cGreyBlack?: MuiPaletteColor;
    cBlack?: MuiPaletteColor;
  }

  export interface PaletteOptions extends MuiPaletteOptions {
    cLightBlue?: MuiPaletteColor;
    cGold?: MuiPaletteColor;
    cBlueGrey?: MuiPaletteColor;
    cWhiteGrey?: MuiPaletteColor;
    cGrey?: MuiPaletteColor;
    cGreyBlack?: MuiPaletteColor;
    cBlack?: MuiPaletteColor;
  }
}
