"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Slider,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Link from "next/link";
import axios from "axios";

const image_creation = () => {
  //store the prompt and image url in state
  const [prompt, setPrompt] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [aspectRatio, setAspectRatio] = React.useState(16 / 9);
  const [width, setWidth] = React.useState(1280);
  const [height, setHeight] = React.useState(720);

  //function to handle the submit button
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/text_to_image",
        {
          text_prompt: prompt,
          imageUrl: imageUrl,
          aspectRatio: aspectRatio,
          width: width,
          height: height,
        }
      );
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Fail to generate image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "16px",
      }}
    >
      <Grid container spacing={2}>
        {/* Left side panel */}
        <Grid item xs={12} sm={4} md={3}>
          <Box
            sx={{ border: "1px solid #fff", padding: "16px", height: "180%" }}
          >
            <Link href="/images/models">
              <Box sx={{ textAlign: "model center", marginBottom: "16px" }}>
                <img src="/" alt="Model image" width="100%" />
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Switch
                </Typography>
              </Box>
            </Link>

            {/* Guidance Section */}
            <Typography
              variant="h6"
              sx={{ marginBottom: "16px", color: "#fff" }}
            >
              Guidance
            </Typography>

            {/* Image Upload */}
            <Box sx={{ marginBottom: "16px" }}>
              <IconButton
                color="primary"
                aria-label="Image to image"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
              <Typography variant="body2">Image to image</Typography>
            </Box>

            {/* size of image */}
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Size of Image
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#fff", marginBottom: "8px" }}
            >
              Aspect Ratio
            </Typography>
            <Select
              IconComponent={(props) => (
                <ArrowDropDownIcon {...props} sx={{ color: "gray" }} />
              )}
              value={aspectRatio}
              onChange={(e) => setAspectRatio(Number(e.target.value))}
              sx={{
                marginBottom: "16px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <MenuItem value={16 / 9}>16:9</MenuItem>
              <MenuItem value={4 / 3}>4:3</MenuItem>
              <MenuItem value={1}>1:1</MenuItem>
            </Select>
            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#fff", marginTop: "8px", marginBottom: "8px" }}
              >
                Width
              </Typography>
              <Slider
                value={width}
                onChange={(e, newValue) => setWidth(newValue as number)}
                step={10}
                min={100}
                max={1920}
                valueLabelDisplay="auto"
                sx={{ marginBottom: "16px", color: "#fff" }}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#fff", marginTop: "8px", marginBottom: "8px" }}
              >
                Height
              </Typography>
              <Slider
                value={height}
                onChange={(e, newValue) => setHeight(newValue as number)}
                step={10}
                min={100}
                max={1080}
                valueLabelDisplay="auto"
                sx={{ marginBottom: "16px", color: "#fff" }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Prompt Input */}
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{ border: "1px solid #fff", padding: "16px", height: "100%" }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Generation:{" "}
            </Typography>
            {imageUrl && (
              <Box sx={{ marginTop: "16px" }}>
                <img
                  src={imageUrl}
                  alt="Generated"
                  width="100%"
                  height="100%"
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{ border: "1px solid #fff", padding: "16px", height: "80%" }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Input your Prompt:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              sx={{
                backgroundColor: "778890",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default image_creation;
