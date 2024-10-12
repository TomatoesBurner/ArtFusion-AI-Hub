import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { ImageApi, MediaItem } from "@/api/imageApi"; // Update to use the new image API
import localStorageHelper from "@/utils/localStorageHelper";

const GallerySection = ({ ipsId }: { ipsId: string }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const items = await ImageApi.fetchMediaItems(ipsId);

        // Extract image URL and build mediaItems array
        const extractedItems = items.data.map((item: any) => ({
          id: item.id,
          type: "image", // Assuming all items are images for now
          url: item.response.imageUrl, // Extract imageUrl from the response
        }));

        // Update the mediaItems state with the extracted data
        setMediaItems(extractedItems);
      } catch (error) {
        console.error("Error fetching media items:", error);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, [ipsId]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (mediaItems.length === 0) {
    return <Typography variant="body1">No images or videos found.</Typography>; // Check if there are no media items
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Gallery
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
          {mediaItems.length === 0 ? (
            <Typography variant="body1">No images or videos found.</Typography>
          ) : (
            mediaItems.map((item) => (
              <Card
                key={item.id}
                sx={{ width: 200, backgroundColor: "#1f1f1f" }}
              >
                <CardMedia
                  component={item.type === "image" ? "img" : "video"}
                  src={item.url}
                  alt={`Media item ${item.id}`}
                  controls={item.type === "video"}
                  sx={{ height: 140 }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.type === "image" ? "Image" : "Video"}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}
    </>
  );
};

export default GallerySection;
