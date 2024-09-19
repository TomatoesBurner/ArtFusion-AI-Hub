import React from "react";
import Link from "next/link";
import { Grid, Button, Typography, Box } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";

const mode_selection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        {/* Modes Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: "300px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <img src="/images/image_gif.gif" alt="Image Mode" width="100%" />
            {/* Image button */}
            <Link href="./images/create">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "20px",
                }}
              >
                Start Image
              </Button>
            </Link>
          </Box>
        </Grid>

        {/* Video Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: "300px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <img src="/images/video_gif.gif" alt="Video Mode" width="100%" />
            {/* Video button */}
            <Link href="./videos/create">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "20px",
                }}
              >
                Start Video
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default mode_selection;
