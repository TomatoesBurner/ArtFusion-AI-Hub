import React from "react";
import { Box, Typography } from "@mui/material";
import FeaturesSection from "./FeaturesSection"; // Import FeaturesSection
import GallerySection from "./GallerySection"; // Import GallerySection

const DashBoardMainContent = () => {
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

export default DashBoardMainContent;
