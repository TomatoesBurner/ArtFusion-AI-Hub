import { TypographyOptions } from "@mui/material/styles/createTypography";

export const getBaseTypographyOverrides = (): TypographyOptions => {
  return {
    button: {
      textTransform: "none",
    },
  };
};
