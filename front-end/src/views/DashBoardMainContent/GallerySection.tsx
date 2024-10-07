import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const GallerySection = () => {
  const downloadFile = (filePath: string) => {
    window.location.href = filePath;
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Gallery
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Image 1 */}
          <Box
            sx={{
              position: "relative",
              width: "200px",
              height: "200px",
              bgcolor: "#1f1f1f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/gallery-1.jpg"
              alt="Image 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
              onClick={() => downloadFile("/images/gallery-1.jpg")}
            >
              <DownloadIcon sx={{ marginRight: 1 }} /> Download
            </Button>
          </Box>
          {/* Image 2 */}
          <Box
            sx={{
              position: "relative",
              width: "200px",
              height: "200px",
              bgcolor: "#1f1f1f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/gallery-2.jpg"
              alt="Image 2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
              onClick={() => downloadFile("/images/gallery-2.jpg")}
            >
              <DownloadIcon sx={{ marginRight: 1 }} /> Download
            </Button>
          </Box>
          {/* Video 1 */}
          <Box
            sx={{
              position: "relative",
              width: "200px",
              height: "200px",
              bgcolor: "#1f1f1f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <video controls style={{ width: "100%", height: "100%" }}>
              <source src="/videos/gallery-3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
              onClick={() => downloadFile("/videos/gallery-3.mp4")}
            >
              <DownloadIcon sx={{ marginRight: 1 }} /> Download
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GallerySection;
