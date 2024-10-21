import React from "react";
import { Box, Paper, Typography } from "@mui/material";
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
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginRight: 1,
          }}
        >
          <Link href="/images/models" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <ImageIcon sx={{ marginRight: 1 }} /> Create New Image
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Start generating images with our easy-to-use tools.
          </Typography>
        </Paper>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            flex: 1,
            marginLeft: 1,
          }}
        >
          <Link href="/videos/models" passHref>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <VideoLibraryIcon sx={{ marginRight: 1 }} /> Create New Video
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Explore video generation with various options.
          </Typography>
        </Paper>
      </Box>

      {/* <Box
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
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            <ImageIcon sx={{ marginRight: 1 }} /> Manage Images
          </Typography>

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
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            <VideoLibraryIcon sx={{ marginRight: 1 }} /> Manage Videos
          </Typography>

          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Access and modify your video library.
          </Typography>
        </Box>
      </Box> */}
    </>
  );
};

export default FeaturesSection;
