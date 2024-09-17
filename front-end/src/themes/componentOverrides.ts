import { Components } from "@mui/material";
import NextLink from "next/link";

export const getBaseOverrideComponents = (): Components => {
  return {
    MuiLink: {
      defaultProps: {
        component: NextLink,
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       variants: [{}],
    //     },
    //   },
    // },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       variants: [
    //         {
    //           props: {
    //             variant: "text",
    //           },
    //         },
    //       ],
    //     },
    //   },
    // },
  };
};
