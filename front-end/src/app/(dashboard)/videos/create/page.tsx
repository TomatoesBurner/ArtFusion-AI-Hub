'use client';
import React from 'react';
import { Box, Grid, Typography, IconButton, Slider, TextField, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import axios from 'axios';

const video_creation = () => {
//store the prompt and video url in state
const [prompt, setPrompt] = React.useState('');
const [videoUrl, setVideoUrl] = React.useState('');
const [loading, setLoading] = React.useState(false);

//function to handle the submit button
const handleSubmit = async () => {
setLoading(true);
try{
  const response = await axios.post('http://localhost:3000/api/text_to_video', {
    text_prompt: prompt,
    videoUrl: videoUrl
  });
  setVideoUrl(response.data.videoUrl);
}catch(error){
  console.error('Fail to generate video:',error);
} finally {
  setLoading(false);
}
};

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#000', color: '#fff', padding: '16px' }}>
          <Grid container spacing={2}>

            {/* Left side panel */}
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ border: '1px solid #fff', padding: '16px', height: '180%' }}>
                <Link href="/videos/models">
                    <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img src="/path_to_your_uploaded_image" alt="Model image" width="100%" />
                    <Typography variant="h6" sx={{ color: '#fff' }}>Switch</Typography>
                    </Box>
                </Link>
    
                {/* Guidance Section */}
                <Typography variant="h6" sx={{ marginBottom: '16px', color: '#fff' }}>Guidance</Typography>
                
                {/* Image Upload */}
                <Box sx={{ marginBottom: '16px' }}>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                  <Typography variant="body2">Image Upload</Typography>
                </Box>
    
                {/* Song Playback */}
                <Box sx={{ marginBottom: '16px' }}>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="audio/*" type="file" />
                    <PlayArrowIcon />
                  </IconButton>
                  <Typography variant="body2">Song Playback</Typography>
                </Box>
    
                {/* Duration Slider */}
                <Typography variant="body2" sx={{ marginBottom: '8px' }}>Duration</Typography>
                <Slider defaultValue={1} step={1} min={1} max={10} sx={{ color: '#fff' }} />
    
                {/* Video Adherence Slider */}
                <Typography variant="body2" sx={{ marginTop: '16px', marginBottom: '8px' }}>Video Adherence</Typography>
                <Slider defaultValue={1} step={0.1} min={0} max={2} sx={{ color: '#fff' }} />
              </Box>
            </Grid>
    
            {/* Prompt Input */}
            <Grid item xs={12} sm={8} md={9}>
                <Box sx={{ border: '1px solid #fff', padding: '16px', height: '100%' }}>
                    <Typography variant="h6" sx={{ color: '#fff' }}>Generation: </Typography>
                    {videoUrl && (
                      <Box sx={{  marginTop: '16px' }}>
                        <video src={videoUrl} controls  width="100%" height="100%" />
                      </Box>
                    )}
                </Box>
              <Box sx={{ border: '1px solid #fff', padding: '16px', height: '80%' }}>
                <Typography variant="h6" sx={{ color: '#fff' }}>Input your Prompt:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your prompt here..."
                  sx={{ backgroundColor: '#fff', marginTop: '16px', marginBottom: '16px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Generating...' : 'Submit'}</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
    );
};

export default video_creation;
