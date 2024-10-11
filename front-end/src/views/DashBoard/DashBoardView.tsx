"use client";

import React, { useEffect, useState } from "react";
import FeaturesSection from "@/components/DashBoardLayout/DashBoardMainContent/FeaturesSection";
import GallerySection from "@/components/DashBoardLayout/DashBoardMainContent/GallerySection";
import { Box, Typography } from "@mui/material";
import { AuthApi } from "@/api/authApi";
import { UserMeDto } from "@/dtos/UserMeDto";

const DashBoardView = () => {
  const [ipsId, setIpsId] = useState<string | null>(null); // State to store ipsId
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthApi.getMe(); // Get user info
        const userData: UserMeDto = response.data; // Use UserMeDto for strong typing
        setIpsId(userData.imagePromptSpaceId); // Set ipsId based on user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchUserData();
  }, []);

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
      {/* Gallery Section - Pass the ipsId as a prop */}
      {ipsId && <GallerySection ipsId={ipsId} />}{" "}
      {/* Render GallerySection only if ipsId is available */}
    </Box>
  );
};

export default DashBoardView;
