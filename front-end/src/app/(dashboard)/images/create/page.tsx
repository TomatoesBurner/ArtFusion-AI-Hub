"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { imageSliceActions } from "../../../../store/slices/imagesSlice";
import ImageFilter from "../../../../components/creation/image_filter";
import ImagePromptListWithScroll from "../../../../components/creation/imagechatlist";

const ImageCreationPage = () => {
  const { filter, prompts } = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get("/api/v1/image-prompts", {
          params: { limit: 10, cursor: "0" },
        });

        dispatch(imageSliceActions.addPrompts(response.data.prompts));
      } catch (error) {
        console.error("Failed to fetch image prompts:", error);
      }
    };
    fetchPrompts();
  }, [dispatch]);

  //function to handle the submit button
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { width, height } = filter;
      // send a POST request to the backend
      const response = await axios.post(
        "http://localhost:3001/api/v1/image-prompt",
        {
          text_prompt: prompt,
          width: width,
          height: height,
        }
      );

      const newPrompt = {
        id: response.data.id,
        text: prompt,
        imageUrl: response.data.data.image_url,
      };

      // add the new prompt to the redux store
      dispatch(imageSliceActions.addPrompts({ prompts: [newPrompt] }));

      // clear the input field
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

        {/* image generation*/}
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{ border: "1px solid #fff", padding: "16px", height: "100%" }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Generation:
            </Typography>
            {/* innput prompt */}
            {prompts.map((prompt) => (
              <Box
                key={prompt.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // 确保内容两端对齐
                  alignItems: "center", // 垂直居中对齐
                  marginTop: "16px",
                }}
              >
                {/* 图片靠左显示 */}
                <img
                  src={prompt.imageUrl}
                  alt={prompt.text}
                  style={{ maxWidth: "50%", height: "auto" }}
                />

                {/* 文本靠右显示 */}
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

export default ImageCreationPage;
