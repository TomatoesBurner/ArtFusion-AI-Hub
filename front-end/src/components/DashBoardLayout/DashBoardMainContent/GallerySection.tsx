import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ImageApi, MediaItem } from "@/api/imageApi"; // Update to use the new image API
import localStorageHelper from "@/utils/localStorageHelper";

const GallerySection = ({ ipsId }: { ipsId: string }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const items = await ImageApi.fetchMediaItems(ipsId);
        setMediaItems(items.data); // 将数据设置到状态中
      } catch (error) {
        console.error("Error fetching media items:", error);
      } finally {
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
    <Box>
      {/* show media item */}
      {mediaItems.map((item) => (
        <Box key={item.id}>
          <Typography>{item.type}</Typography>
          <img src={item.url} alt={`Media item ${item.id}`} />
        </Box>
      ))}
    </Box>
  );
};

export default GallerySection;
