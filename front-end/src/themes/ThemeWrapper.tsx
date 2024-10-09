import React, { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import getMuiTheme, { MuiThemeMode } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  //   const mode: MuiThemeMode = "dark";
  const mode: MuiThemeMode = useSelector(
    (state: RootState) => state.user.themeMode
  ) as MuiThemeMode;

  const theme = useMemo(() => {
    return getMuiTheme(mode);
  }, [mode]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeWrapper;
