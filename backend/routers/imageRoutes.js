//HOW TO CALL THIS API
//Make a POST request with body for example: {"text_prompt": "A young boy eating a chocolate"}
//Send the request to this API URL: http://localhost:3000/api/text_to_image
//You can test the API with Postman

const express = require("express");
const router = express.Router();
const axios = require("axios"); // For making API calls

// Route for text-to-image generation
router.post("/", async (req, res) => {
    const { text_prompt } = req.body; // Expecting text input from the request

    var image_url = encodeURI(
        "https://image.pollinations.ai/prompt/" + text_prompt
    );
    try {
        // Example API call to an external image generation service
        const response = await axios.get(
            image_url,
            {
                // prompt: text
            },
            {
                headers: {
                    //'Authorization': 'Bearer YOUR_API_KEY'  // Replace with your actual API key
                },
            }
        );

        // Send the generated image URL or data back to the frontend
        res.status(200).json({
            // imageUrl: response.data.image_url  // Adjust based on the actual API response
            image_url: image_url,
        });
    } catch (error) {
        res.status(500).json({ error: "Image generation failed" });
    }
});

module.exports = router;
