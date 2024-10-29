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

declare module "@mui/material/styles" {
  interface Palette {
    cLightBlue: MuiPallete;
    cGold: MuiPallete["primary"];
    cBlueGrey: MuiPallete["primary"];
    cWhiteGrey: MuiPallete["primary"];
    cGrey: MuiPallete["primary"];
    cGreyBlack: MuiPallete["primary"];
    cBlack: MuiPallete["primary"];
  }

  interface PaletteOptions {
    cLightBlue?: MuiPaletteOptions["primary"];
    cGold?: MuiPaletteOptions["primary"];
    cBlueGrey?: MuiPaletteOptions["primary"];
    cWhiteGrey?: MuiPaletteOptions["primary"];
    cGrey?: MuiPaletteOptions["primary"];
    cGreyBlack?: MuiPaletteOptions["primary"];
    cBlack?: MuiPaletteOptions["primary"];
  }
  // interface palette extends MuiPallete {
  //   cLightBlue?: MuiPaletteColor;
  //   cGold?: MuiPaletteColor;
  //   cBlueGrey?: MuiPaletteColor;
  //   cWhiteGrey?: MuiPaletteColor;
  //   cGrey?: MuiPaletteColor;
  //   cGreyBlack?: MuiPaletteColor;
  //   cBlack?: MuiPaletteColor;
  // }

  // interface PaletteOptions extends MuiPaletteOptions {
  //   cLightBlue?: MuiPaletteColor;
  //   cGold?: MuiPaletteColor;
  //   cBlueGrey?: MuiPaletteColor;
  //   cWhiteGrey?: MuiPaletteColor;
  //   cGrey?: MuiPaletteColor;
  //   cGreyBlack?: MuiPaletteColor;
  //   cBlack?: MuiPaletteColor;
  // }
}
