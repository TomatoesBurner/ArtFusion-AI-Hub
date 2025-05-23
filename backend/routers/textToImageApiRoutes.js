//API docs can be access in: https://documenter.getpostman.com/view/34479210/2sAXqs83D2

const express = require("express");
const router = express.Router();
const axios = require("axios"); // For making API calls

// Route for text-to-image generation
router.post("/", async (req, res) => {
    const { text_prompt } = req.body; // Expecting text input from the request

    // Check if text_prompt is provided
    if (!text_prompt) {
        return res.status(500).json({ error: "Image generation failed" });
    }

    // Construct the image URL by encoding the text prompt
    var image_url = encodeURI(
        "https://image.pollinations.ai/prompt/" + text_prompt
    );
    try {
        // Example API call to an external image generation service
        const response = await axios.post(
            image_url,
            {},
            {
                headers: {
                    //'Authorization': 'Bearer API_KEY'
                },
            }
        );

        // Log the response from the API
        console.log(response.data);

        // Send the generated image URL or data back to the frontend / client
        res.status(200).json({
            status: "success",
            data: {
                image_url: image_url,
            },
            message: "Image generation success.",
        });
    } catch (error) {
        res.status(500).json({ error: "Image generation failed" });
    }
});

// Route for text-to-image generation (for backup)
router.post("/backup", async (req, res) => {
    const { text_prompt, width, height } = req.body; // Expecting text input from the request

    // Check if text_prompt is provided
    if (!text_prompt) {
        return res.status(500).json({ error: "Image generation failed" });
    }

    const options = {
        method: "POST",
        url: "https://modelslab.com/api/v6/realtime/text2img",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            key: "XTBQisoBZAhY5En42W74MjvTrN8dAazWV8udk5KpoF29dhG3xijjculBExZf", // Replace with actual API key
            prompt: text_prompt, // Using the user-provided prompt
            negative_prompt: "poor quality",
            width: width,
            height: height,
            safety_checker: false,
            seed: null,
            samples: 1,
            base64: false,
            webhook: null,
            track_id: null,
        },
    };

    try {
        // Send the POST request to the external API
        const response = await axios(options);

        // Log the response from the API
        console.log(response.data);

        res.status(200).json({
            status: response.data.status,
            id: response.data.id,
            data: {
                image_url: response.data.output,
            },
            message: response.data.message
                ? response.data.message
                : "Image generation success",
        });
    } catch (error) {
        console.error("API call failed:", error);
        res.status(500).json({
            status: "error",
            message: "Image generation failed",
        });
    }
});

// Export the router for use in the main application
module.exports = router;
