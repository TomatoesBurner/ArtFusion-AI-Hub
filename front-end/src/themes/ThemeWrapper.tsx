import React, { useMemo } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const mode = "dark";

    const theme = useMemo(() => {
        return createTheme();
    }, [mode])

    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}

export default ThemeWrapper;
