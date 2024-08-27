"use client";

import React from 'react';
import { Box, CssBaseline } from "@mui/material"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box display={"flex"}>
            <CssBaseline />
            <main>
                {children}
            </main>
        </Box>
    );
}

export default DashBoardLayout;
