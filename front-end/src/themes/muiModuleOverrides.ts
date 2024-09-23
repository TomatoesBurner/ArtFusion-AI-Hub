import { PaletteColorOptions } from "@mui/material";

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
