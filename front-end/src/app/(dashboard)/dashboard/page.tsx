"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import Footer from "@/components/Footer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Help Center icon
import HomeIcon from "@mui/icons-material/Home"; // Home icon
import ImageIcon from "@mui/icons-material/Image"; // Image icon
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"; // Video icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon
import UploadIcon from "@mui/icons-material/CloudUpload"; // Upload icon
import DownloadIcon from "@mui/icons-material/CloudDownload"; // Download icon

const UserDashboard = () => {
  // download
  const downloadFile = (filePath) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop(); // Sets the filename to the last part of the path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#121212",
        color: "#fff",
      }}
    >
      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1f1f1f" }}>
        <Toolbar>
          <Typography variant="h6">User Workspace</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: 8 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 240,
            backgroundColor: "#282828",
            color: "#fff",
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Menu
            </Typography>

            {/* User Info Section */}
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Avatar src="/images/avatar.jpg" sx={{ marginRight: 1 }} />
              <Box>
                <Typography variant="body1">Creator: hazli</Typography>
                <Typography variant="body2">
                  Email: cloud9night@gmail.com
                </Typography>
              </Box>
            </Box>

            {/* Menu Links */}
            <Link href="/" passHref>
              <Button
                color="inherit"
                fullWidth
                sx={{ justifyContent: "flex-start", padding: 1 }}
              >
                <HomeIcon sx={{ marginRight: 1 }} /> Home
              </Button>
            </Link>
            <Link href="/images/create" passHref>
              <Button
                color="inherit"
                fullWidth
                sx={{ justifyContent: "flex-start", padding: 1 }}
              >
                <ImageIcon sx={{ marginRight: 1 }} /> Images
              </Button>
            </Link>
            <Link href="/videos/create" passHref>
              <Button
                color="inherit"
                fullWidth
                sx={{ justifyContent: "flex-start", padding: 1 }}
              >
                <VideoLibraryIcon sx={{ marginRight: 1 }} /> Videos
              </Button>
            </Link>
            <Link href="/settings" passHref>
              <Button
                color="inherit"
                fullWidth
                sx={{ justifyContent: "flex-start", padding: 1 }}
              >
                <SettingsIcon sx={{ marginRight: 1 }} /> Settings
              </Button>
            </Link>
          </div>

          {/* Help Center and Logout at the bottom */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              href="https://docs.google.com/document/d/1yMv6Ku2RxctlIyRDWTS6gjDIu8FhOGqs8AKZHOD6rrY/edit"
              passHref
            >
              <Button
                color="inherit"
                fullWidth
                sx={{ justifyContent: "flex-start", padding: 1 }}
              >
                <HelpOutlineIcon sx={{ marginRight: 1 }} />
                Help Center
              </Button>
            </Link>
            <Button
              color="inherit"
              fullWidth
              sx={{ justifyContent: "flex-start", padding: 1 }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "#121212", padding: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Manage your images and videos effortlessly.
          </Typography>

          {/* Additional Features Section */}
          <Typography variant="h6" sx={{ marginTop: 4 }}>
            Quick Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
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
              <Link href="/(dashboard)/images/manage" passHref>
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
              <Link href="/(dashboard)/videos/manage" passHref>
                <Typography variant="h6" sx={{ cursor: "pointer" }}>
                  <VideoLibraryIcon sx={{ marginRight: 1 }} /> Manage Videos
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Access and modify your video library.
              </Typography>
            </Box>
          </Box>

          {/* Gallery Section */}
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
                  src="images/gallery-1.jpg"
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
                  onClick={() => downloadFile("images/gallery-1.jpg")}
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
                  src="images/gallery-2.jpg"
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
                  onClick={() => downloadFile("images/gallery-2.jpg")}
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
                  <source src="videos/gallery-3.mp4" type="video/mp4" />
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
                  onClick={() => downloadFile("videos/gallery-3.mp4")}
                >
                  <DownloadIcon sx={{ marginRight: 1 }} /> Download
                </Button>
              </Box>
              {/* Add more media elements as needed */}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default UserDashboard;
