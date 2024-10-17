"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import FeaturesSection from "@/components/DashBoardLayout/DashBoardMainContent/FeaturesSection";
import GallerySection from "@/components/DashBoardLayout/DashBoardMainContent/GallerySection";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { RootState } from "@/store/store";

const DashBoardView = () => {
  const user = useSelector((state: RootState) => state.user);
  const vpsId = user.videoPromptSpaceId;
  const ipsId = user.imagePromptSpaceId;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: 3,
        borderRadius: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          Welcome, {user.name}{" "}
          <EmojiEmotionsIcon sx={{ marginLeft: 2 }} fontSize="large" />
        </Typography>

        <Typography variant="body1">What will you design today?</Typography>
      </Paper>
      {/* Features Section */}
      <FeaturesSection />
      {/* Pass ipsId and vpsId to GallerySection */}
      {ipsId ? (
        <GallerySection ipsId={ipsId} vpsId={vpsId || ""} />
      ) : (
        <Typography variant="body1">No Image Prompt Space found.</Typography>
      )}
    </Box>
  );
};

export default DashBoardView;
