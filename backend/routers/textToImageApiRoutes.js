//HOW TO CALL THIS API
//Make a POST request with body for example: {"text_prompt": "A young boy eating a chocolate"}
//Send the request to this API URL: http://localhost:3000/api/vi/image-prompt
//You can test the API with Postman


const express = require('express');
const router = express.Router();
const axios = require('axios');  // For making API calls

// Route for text-to-image generation
router.post('/', async (req, res) => {
    const { text_prompt } = req.body;  // Expecting text input from the request

    // Construct the image URL by encoding the text prompt
    var image_url = encodeURI('https://image.pollinations.ai/prompt/' + text_prompt);
    try {
        // Example API call to an external image generation service
        const response = await axios.post(image_url, {
        }, {
            headers: {
                //'Authorization': 'Bearer API_KEY'  
            }
        });

        // Send the generated image URL or data back to the frontend / client
        res.status(200).json({
            status: "success",
            image_url: image_url
        });
    } catch (error) {
        res.status(500).json({ error: 'Image generation failed' });
    }
});


// Route for text-to-image generation (for backup)
router.post('/backup', async (req, res) => {
    const { text_prompt } = req.body;  // Expecting text input from the request

    const options = {
        method: 'POST',
        url: 'https://modelslab.com/api/v6/realtime/text2img',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            key: "UgFdYJIjF6AzvJx8sMg4i9EfcgSMGvZlHyIkuFeMk8GcV35KBCGI5Sf2ok2l",  // Replace with actual API key
            prompt: text_prompt,  // Using the user-provided prompt
            negative_prompt: "bad quality",
            width: "512",
            height: "512",
            safety_checker: false,
            seed: null,
            samples: 1,
            base64: false,
            webhook: null,
            track_id: null
        }
    };

    try {
        // Send the POST request to the external API
        const response = await axios(options);

        // Log the response from the API
        console.log(response.data);

        res.status(200).json({
            status: response.data.status,
            image_url: response.data.output
        });
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).json({ 
            status: "error",
            message: 'Image generation failed' 
        });
    }

});


// Export the router for use in the main application
module.exports = router;
