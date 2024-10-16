import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Slider,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import { appApi } from "@/api/baseApi";
import { enqueueSnackbar } from "notistack";

const ImageFilterView = ({ selectedImage, onClose }) => {
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
  });

  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  // const downloadImage = async () => {
  //   if (!selectedImage || !selectedImage.url) {
  //     enqueueSnackbar("No image URL available to download.", {
  //       variant: "error",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(selectedImage.url);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const blob = await response.blob();
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "downloaded-image.png"; // Filename for the downloaded image
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(link.href);
  //     enqueueSnackbar("Image downloaded successfully!", { variant: "success" });
  //   } catch (error) {
  //     console.error("Error downloading image:", error);
  //     enqueueSnackbar("Failed to download image.", { variant: "error" });
  //   }
  // };

  // Function to handle viewing the image
  const viewImage = () => {
    if (selectedImage && selectedImage.url) {
      window.open(selectedImage.url, "_blank"); // Opens the image in a new tab
    } else {
      enqueueSnackbar("No image URL available to view.", { variant: "error" });
    }
  };

  // Function to reset filters to their initial values
  const resetFilters = () => {
    setFilters({
      blur: 0,
      brightness: 100,
    });
  };

  const filterStyle = {
    filter: `blur(${filters.blur}px) brightness(${filters.brightness}%)`,
    transition: "filter 0.3s ease",
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, marginLeft: 4 }}>
        Apply Filters
      </Typography>
      <Card sx={{ marginBottom: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={selectedImage.url}
          alt="Image to filter"
          sx={{
            height: 300,
            objectFit: "contain",
            borderRadius: 2,
            ...filterStyle,
          }}
        />
      </Card>
      <Divider sx={{ marginBottom: 2 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Adjust Filters
        </Typography>
        <Button
          onClick={resetFilters}
          variant="contained"
          color="primary"
          sx={{ marginLeft: 2 }}
        >
          Reset
        </Button>
      </Box>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Use the sliders to customize the image appearance.
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Blur
      </Typography>
      <Slider
        value={filters.blur}
        onChange={(e, newValue) => handleFilterChange("blur", newValue)}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        aria-labelledby="blur-slider"
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Brightness
      </Typography>
      <Slider
        value={filters.brightness}
        onChange={(e, newValue) => handleFilterChange("brightness", newValue)}
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        aria-labelledby="brightness-slider"
        sx={{ marginBottom: 2 }}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button onClick={viewImage} variant="contained" color="primary">
          View Original Image
        </Button>

        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </Box>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Hint: Right Click to Download Your Creation in View Page
      </Typography>
    </Box>
  );
};

export default ImageFilterView;
