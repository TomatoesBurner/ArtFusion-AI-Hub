import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { AuthApi } from "@/api/authApi";
import { UserMeDto } from "@/dtos/UserMeDto";
import localStorageHelper from "@/utils/localStorageHelper";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
}

const GallerySection = ({ ipsId }: { ipsId: string }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMe, setUserMe] = useState<UserMeDto | null>(null);

  useEffect(() => {
    const fetchUserMe = async () => {
      try {
        const response = await AuthApi.getMe(); // Get user info
        const userData: UserMeDto = response.data; // Use UserMeDto for strong typing
        setUserMe(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserMe();
  }, []);

  useEffect(() => {
    const fetchMediaItems = async () => {
      if (!userMe || !ipsId) return; // Do not fetch if user data is not available

      try {
        setLoading(true);
        const accessToken = localStorageHelper.getAccessToken().token; // Use the helper to get the token
        const url = `/api/v1/imagePromptSpaces/${ipsId}/imagePrompts`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the token in the header
          },
        });

        // Adjust the mapping based on backend response structure
        const items = response.data.data.map((item: any) => ({
          id: item.id,
          type: item.type === "video" ? "video" : "image",
          url: item.url,
        }));

        setMediaItems(items);
      } catch (error) {
        console.error(
          "Error fetching media items:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, [ipsId, userMe]); // Depend on userMe

  const downloadFile = (filePath: string) => {
    window.location.href = filePath;
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Gallery
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {mediaItems.map((item) => (
              <Box
                key={item.id}
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
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`Image ${item.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <video controls style={{ width: "100%", height: "100%" }}>
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                  }}
                  onClick={() => downloadFile(item.url)}
                >
                  <DownloadIcon sx={{ marginRight: 1 }} /> Download
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default GallerySection;
