//API docs can be access in: https://documenter.getpostman.com/view/34479210/2sAXqs83D2

const express = require("express");
const router = express.Router();
const axios = require("axios"); // For making API calls

// Route for text-to-video generation
router.post("/", async (req, res) => {
    const { text_prompt } = req.body; // Expecting text input from the request

    // Check if text_prompt is provided
    if (!text_prompt) {
        return res.status(500).json({ error: "Video generation failed" });
    }

    const requestBody = {
        key: "XTBQisoBZAhY5En42W74MjvTrN8dAazWV8udk5KpoF29dhG3xijjculBExZf", // API key
        model_id: "zeroscope",
        prompt: text_prompt, // Use the prompt from the request body
        negative_prompt: "low quality",
        height: 320,
        width: 512,
        num_frames: 16,
        num_inference_steps: 20,
        guidance_scale: 7,
        upscale_height: 640,
        upscale_width: 1024,
        upscale_strength: 0.6,
        upscale_guidance_scale: 12,
        upscale_num_inference_steps: 20,
        output_type: "mp4",
        webhook: null,
        track_id: null,
    };

    try {
        // Example API call to an external text-to-video generation service
        const response = await axios.post(
            "https://modelslab.com/api/v6/video/text2video",
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Send the generated video URL or data back to the frontend
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Video generation failed" });
    }
});

// Route for text-to-video generation
router.post("/backup", async (req, res) => {
    const { text_prompt } = req.body; // Expecting text input from the request

    // Check if text_prompt is provided
    if (!text_prompt) {
        return res.status(500).json({ error: "Video generation failed" });
    }

    try {
        const { Client } = await import("@gradio/client");
        const app = await Client.connect(
            "https://videocrafter-videocrafter.hf.space/"
        );

        const result = await app.predict(1, [
            text_prompt,
            16, // Sampling steps (numeric value between 1 and 60)
            15, // CFG scale (numeric value between 1.0 and 30.0)
            1, // ETA (numeric value between 0.0 and 1.0)
            5, // FPS (frames per second, between 4 and 32)
        ]);

        var video_id = result.data[0][0].name;
        var video_url =
            "https://videocrafter-videocrafter.hf.space/file=" + video_id;
        // Output the generated video data
        console.log(result.data);

        // Send the generated video URL or data back to the frontend
        res.status(200).json({
            status: "Success.",
            data: {
                video_url: video_url,
            },
            message: "Video generation success.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Video generation failed" });
    }
});

module.exports = router;
