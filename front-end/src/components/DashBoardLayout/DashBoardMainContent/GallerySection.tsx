import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
} from "@mui/material";
import { ImageApi, MediaItem } from "@/api/imageApi";
import ImageFilterView from "@/views/image/ImageFilterView";

const GallerySection = ({ ipsId }: { ipsId: string }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const items = await ImageApi.fetchMediaItems(ipsId);
        const extractedItems = items.data.map((item: any) => ({
          id: item.id,
          type: "image",
          url: item.response.imageUrl,
        }));
        setMediaItems(extractedItems);
      } catch (error) {
        console.error("Error fetching media items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, [ipsId]);

  const handleImageClick = (item: MediaItem) => {
    setSelectedImage(item); // Set the selected image
    setModalOpen(true); // Open the modal
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (mediaItems.length === 0) {
    return <Typography variant="body1">No images or videos found.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Gallery
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
        {mediaItems.map((item) => (
          <Card
            key={item.id}
            sx={{ width: 200, backgroundColor: "#1f1f1f", cursor: "pointer" }}
            onClick={() => handleImageClick(item)}
          >
            <CardMedia
              component="img"
              image={item.url}
              alt={`Media item ${item.id}`}
              sx={{ height: 140 }}
            />
            <Typography variant="body2" color="text.secondary">
              {item.type === "image" ? "Image" : "Video"}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Modal for Image Filtering */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        {selectedImage && (
          <ImageFilterView
            selectedImage={selectedImage}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Dialog>
    </>
  );
};

export default GallerySection;
