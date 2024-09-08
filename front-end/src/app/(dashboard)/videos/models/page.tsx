import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const models = [
    { title: "Natural scenery", img: "/images/ns.gif" },
    { title: "Fantasy style", img: "/images/fs.gif" },
    { title: "Abstract art", img: "/images/aa.gif" },
    { title: "Kaleidoscope", img: "/images/ka.gif" },
    { title: "Realistic animation", img: "/images/ra.gif" },
    { title: "Pixel art", img: "/images/pa.gif" },
    { title: "Experimental art", img: "/images/ea.gif" },
    { title: "Vintage style", img: "/images/vs.gif" },
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
            Video Models
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