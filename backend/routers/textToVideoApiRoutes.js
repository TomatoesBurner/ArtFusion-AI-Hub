//HOW TO CALL THIS API
//Make a POST request with body for example: {"text_prompt": "A young boy eating a chocolate"}
//Send the request to this API URL: http://localhost:3000/api/v1/video-prompt
//You can test the API with Postman


const express = require('express');
const router = express.Router();
const axios = require('axios');  // For making API calls

// Route for text-to-video generation
router.post('/', async (req, res) => {
    const { text_prompt } = req.body;  // Expecting text input from the request

    // Check if text_prompt is provided
    if (!text_prompt) {
        return res.status(500).json({ error: 'Video generation failed' });
    }

    const requestBody = {
        // key: "UgFdYJIjF6AzvJx8sMg4i9EfcgSMGvZlHyIkuFeMk8GcV35KBCGI5Sf2ok2l", //API key
        key: "XTBQisoBZAhY5En42W74MjvTrN8dAazWV8udk5KpoF29dhG3xijjculBExZf",  // API key 
        model_id: "zeroscope",
        prompt: text_prompt,  // Use the prompt from the request body
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
        track_id: null
    };

    try {
        // Example API call to an external text-to-video generation service
        const response = await axios.post('https://modelslab.com/api/v6/video/text2video', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Send the generated video URL or data back to the frontend
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Video generation failed' });
    }
});

module.exports = router;
