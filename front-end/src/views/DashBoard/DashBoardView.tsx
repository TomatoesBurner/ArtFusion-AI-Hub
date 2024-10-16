"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "@/store/slices/userSlice";
import { AuthApi } from "@/api/authApi";
import FeaturesSection from "@/components/DashBoardLayout/DashBoardMainContent/FeaturesSection";
import GallerySection from "@/components/DashBoardLayout/DashBoardMainContent/GallerySection";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const DashBoardView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: { name: string } }) => state.user); // Get user data from slice
  const [loading, setLoading] = useState(true);
  const [ipsId, setIpsId] = useState<string | null>(null);
  const [vpsId, setVpsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthApi.getMe(); // Get user info
        const userData = response.data;
        setIpsId(userData.imagePromptSpaceId); // Set ipsId based on user data
        setVpsId(userData.videoPromptSpaceId);
        dispatch(userSliceActions.setUser({ user: userData })); // Set user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  // Show a loading state if user data is being fetched
  if (loading) {
    return <LinearProgress />;
  }

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
        <GallerySection ipsId={ipsId} vpsId={vpsId} />
      ) : (
        <Typography variant="body1">No Image Prompt Space found.</Typography>
      )}
    </Box>
  );
};

export default DashBoardView;
