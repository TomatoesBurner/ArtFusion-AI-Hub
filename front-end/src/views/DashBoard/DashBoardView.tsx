"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { userSliceActions } from "@/store/slices/userSlice";
import { AuthApi } from "@/api/authApi";
import FeaturesSection from "@/components/DashBoardLayout/DashBoardMainContent/FeaturesSection";
import GallerySection from "@/components/DashBoardLayout/DashBoardMainContent/GallerySection";

const DashBoardView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ipsId, setIpsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthApi.getMe(); // Get user info
        const userData = response.data; // Use strong typing if needed
        setIpsId(userData.imagePromptSpaceId); // Set ipsId based on user data
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
    return <Typography variant="body1">Loading user data...</Typography>;
  }

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
      {/* Pass ipsId to GallerySection */}
      {ipsId ? (
        <GallerySection ipsId={ipsId} />
      ) : (
        <Typography variant="body1">No Image Prompt Space found.</Typography>
      )}
    </Box>
  );
};

export default DashBoardView;
