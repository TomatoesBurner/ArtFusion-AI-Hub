"use client";

import FeaturesSection from "@/components/DashBoardLayout/DashBoardMainContent/FeaturesSection";
import GallerySection from "@/components/DashBoardLayout/DashBoardMainContent/GallerySection";
import { Box, Typography } from "@mui/material";

const DashBoardView = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "#121212", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Manage your images and videos effortlessly.
      </Typography>

      {/* Features Section */}
      <FeaturesSection />

      {/* Gallery Section */}
      <GallerySection />
    </Box>
  );
};

export default DashBoardView;
