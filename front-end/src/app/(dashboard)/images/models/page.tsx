import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const models = [
    { title: "Animate", img: "/images/animate.png" },
    { title: "Abstract art", img: "/images/abstract.png" },
    { title: "Oil painting style", img: "/images/oil.png" },
    { title: "Sketch", img: "/images/sketch.png" },
    { title: "Cyberpunk", img: "/images/cyberpunk.png" },
    { title: "Retro style", img: "/images/retro.png" },
    { title: "Rococo style", img: "/images/rococo.png" },
    { title: "Realism", img: "/images/realism.png" },
  ];
const ImageModels = () => {
    return (
        <Box sx={{ 
            backgroundColor: "#000", 
            color: "#fff", 
            padding: 4 ,
            minHeight: "100vh"
            }}
        >
            <Typography variant="h3" align="center" gutterBottom>
            Image Models
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {models.map((model, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: "#222" }}>
                        <CardMedia
                        component="img"
                        height="200"
                        image={model.img}
                        alt={model.title}
                        />
                        <CardContent>
                        <Typography variant="h6" align="center" sx={{color: "#fff"}}> 
                            {model.title}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
      </Box>  
    );
};

export default ImageModels;