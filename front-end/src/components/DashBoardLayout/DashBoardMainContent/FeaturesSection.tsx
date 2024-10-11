import React from "react";
import { Box, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import Link from "next/link";

const FeaturesSection = () => {
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Quick Features
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginRight: 1,
          }}
        >
          <Link href="/images/create" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <ImageIcon sx={{ marginRight: 1 }} /> Create New Image
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Start generating images with our easy-to-use tools.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginLeft: 1,
          }}
        >
          <Link href="/videos/create" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <VideoLibraryIcon sx={{ marginRight: 1 }} /> Create New Video
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Explore video generation options for your projects.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginRight: 1,
          }}
        >
          <Link href="/images" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <ImageIcon sx={{ marginRight: 1 }} /> Manage Images
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            View and edit your existing images.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1f1f1f",
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginLeft: 1,
          }}
        >
          <Link href="/videos" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <VideoLibraryIcon sx={{ marginRight: 1 }} /> Manage Videos
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Access and modify your video library.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default FeaturesSection;
