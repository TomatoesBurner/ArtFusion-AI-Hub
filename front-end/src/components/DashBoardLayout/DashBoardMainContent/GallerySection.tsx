import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  Paper,
} from "@mui/material";
import { ImageApi, MediaItem } from "@/api/imageApi";
import { VideoApi } from "@/api/videoApi";
import ImageFilterView from "@/views/image/ImageFilterView";

const GallerySection = ({ ipsId, vpsId }: { ipsId: string; vpsId: string }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch images
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
        console.error("Error fetching image items:", error);
      }
    };

    fetchMediaItems();
  }, [ipsId]);

  // Fetch videos
  useEffect(() => {
    const fetchVideoItems = async () => {
      if (!vpsId) {
        console.error("vpsId is undefined");
        setLoading(false);
        return;
      }

      try {
        const videoResponse = await VideoApi.getAllVideoPrompts(vpsId);
        if (!videoResponse.data) {
          console.error("No data returned from video API");
          return;
        }
        const extractedVideos = videoResponse.data.map((item: any) => ({
          id: item.id,
          type: "video",
          url: item.response.videoUrl,
        }));
        setMediaItems((prevItems) => [...prevItems, ...extractedVideos]);
      } catch (error) {
        console.error("Error fetching video items:", error);
      } finally {
        setLoading(false); // 确保在请求完成时设置加载状态
      }
    };

    fetchVideoItems();
  }, [vpsId]);

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
    setModalOpen(true);
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

  const images = mediaItems.filter((item) => item.type === "image");
  const videos = mediaItems.filter((item) => item.type === "video");

  return (
    <>
      {/* Image Gallery Section */}
      <Paper
        elevation={3}
        sx={{ padding: 2, borderRadius: 4, marginBottom: 3, marginTop: 3 }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Image Workbench
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {images.length > 0 ? (
            images.map((item) => (
              <Card
                key={item.id}
                sx={{
                  width: 200,
                  backgroundColor: "#1f1f1f",
                  cursor: "pointer",
                }}
                onClick={() => handleMediaClick(item)}
              >
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={`Image item ${item.id}`}
                  sx={{ height: 140 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Image
                </Typography>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No images found.</Typography>
          )}
        </Box>
      </Paper>

      {/* Video Gallery Section */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Video Gallery
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {videos.length > 0 ? (
            videos.map((item) => (
              <Card
                key={item.id}
                sx={{
                  width: 200,
                  backgroundColor: "#1f1f1f",
                  cursor: "pointer",
                }}
                onClick={() => handleMediaClick(item)}
              >
                <CardMedia
                  component="video"
                  src={item.url}
                  alt={`Video item ${item.id}`}
                  sx={{ height: 140 }}
                  controls
                />
                <Typography variant="body2" color="text.secondary">
                  Video
                </Typography>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No videos found.</Typography>
          )}
        </Box>
      </Paper>

      {/* Modal for Image Filtering */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
        {selectedMedia && (
          <ImageFilterView
            selectedImage={selectedMedia}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Dialog>
    </>
  );
};

export default GallerySection;
