"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { imageSliceActions } from "../../../../store/slices/imagesSlice";
import ImageFilter from "../../../../components/creation/image_filter";
import axios from "axios";

const ImageCreationPage = () => {
  const { filter, prompts } = useSelector((state: RootState) => state.images);
  const imagePromptSpaceId = useSelector(
    (state: RootState) => state.user.imagePromptSpaceId
  );
  console.log(imagePromptSpaceId);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // 获取初始的图片提示（prompts）
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/${imagePromptSpaceId}/imagePrompts`,
          {
            params: { limit: 10, cursor: "0" },
          }
        );

        dispatch(imageSliceActions.addPrompts(response.data.prompts));
      } catch (error) {
        console.error("Failed to fetch image prompts:", error);
      }
    };
    fetchPrompts();
  }, [dispatch, imagePromptSpaceId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { width, height } = filter;

      //fisrt, call the image generation API
      const response = await axios.post(
        "http://localhost:3001/api/v1/image-prompt/",
        {
          text_prompt: prompt,
          width: width,
          height: height,
        }
      );

      const imageUrl = response.data.data.image_url;

      const saveResponse = await axios.post(
        `http://localhost:3001/api/v1/${imagePromptSpaceId}/imagePrompts`, // 存储到slice的API
        {
          text_prompt: prompt,
          imageUrl: imageUrl,
          width: width,
          height: height,
        }
      );

      const newPrompt = {
        id: saveResponse.data.id,
        text: prompt,
        imageUrl: imageUrl,
      };

      dispatch(imageSliceActions.addPrompts({ prompts: [newPrompt] }));

      setPrompt("");
    } catch (error) {
      console.error("Failed to create image prompt:", error);
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
        {/* filter */}
        <Grid item xs={12} sm={4} md={3}>
          <ImageFilter />
        </Grid>

        {/* generation */}
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{ border: "1px solid #fff", padding: "16px", height: "100%" }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Generation:
            </Typography>
            {/* display prompts */}
            {prompts.map((prompt) => (
              <Box
                key={prompt.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <img
                  src={prompt.imageUrl}
                  alt={prompt.text}
                  style={{ maxWidth: "50%", height: "auto" }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", textAlign: "right" }}
                >
                  {prompt.text}
                </Typography>
              </Box>
            ))}
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
                backgroundColor: "#778890",
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

export default ImageCreationPage;
