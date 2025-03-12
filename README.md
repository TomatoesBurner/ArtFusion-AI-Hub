# ArtFusion-AI-Hub

[![Deployed Link](https://img.shields.io/badge/Deployed%20Link-Click%20Here-brightgreen)](https://art-fusion-ai-hub.netlify.app)

ArtFusion-AI-Hub is an innovative AI-powered application that allows users to generate and manage AI-generated images and videos through a seamless chat-like interface. Leveraging third-party APIs, this platform provides tools for creating, editing, and organizing AI-generated content while offering a modern user experience with features like two-factor authentication, dark/light themes, and more.

---

## Table of Contents

-   [ArtFusion-AI-Hub](#artfusion-ai-hub)
    -   [Table of Contents](#table-of-contents)
    -   [Description](#description)
    -   [Features](#features)
    -   [Tech Stack](#tech-stack)
        -   [Backend](#backend)
        -   [Frontend](#frontend)
        -   [Deployment](#deployment)
    -   [Deployment](#deployment-1)
    -   [Getting Started](#getting-started)
        -   [Prerequisites](#prerequisites)
        -   [Installation](#installation)
    -   [Contributors](#contributors)

---

## Description

ArtFusion-AI-Hub is a cutting-edge AI application that empowers users to create and manage AI-generated content such as images and videos using text prompts. The intuitive chat-like environment lets users interact with their creations effortlessly. With advanced features like image editing, filters, Google login, two-factor authentication, and customizable themes, ArtFusion-AI-Hub delivers a comprehensive and user-friendly experience.

**Test Credentials**

-   **Username**: `test@gmail.com`
-   **Password**: `Pass1234@`

---

## Features

-   **Authentication**: Secure login and registration with optional Google login and two-factor authentication (OTP).
-   **AI Image Generation**: Generate stunning AI images from text prompts.
-   **Image Management**: Edit, apply filters, and organize your AI-generated images.
-   **AI Video Generation**: Create AI-generated videos using simple text prompts.
-   **Content Management**: Manage all your generated AI content in one place.
-   **Dark/Light Theme**: Switch between dark and light themes for a personalized experience.
-   **User Profile**: View and update your profile details.

---

## Tech Stack

### Backend

-   **Languages**: JavaScript
-   **Frameworks**: Node.js, Express.js
-   **Database**: MongoDB
-   **Storage**: AWS S3 Bucket

### Frontend

-   **Languages**: TypeScript
-   **Frameworks**: React
-   **UI Libraries**: Material-UI (MUI), Styled Components

### Deployment

-   **Frontend**: Hosted on [Netlify](https://www.netlify.com/)
-   **Backend**: Hosted on [Render](https://render.com/)
-   **Live Site**: [ArtFusion-AI-Hub](https://art-fusion-ai-hub.netlify.app)

---

## Deployment

The application is deployed and accessible at the following link:  
[https://art-fusion-ai-hub.netlify.app](https://art-fusion-ai-hub.netlify.app)

-   **Frontend**: Deployed on Netlify for fast and reliable hosting.
-   **Backend**: Deployed on Render for scalable API services.
-   **Storage**: AWS S3 Bucket used for storing user-generated content securely.

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   MongoDB instance (local or cloud)
-   AWS S3 Bucket (optional, for storage)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/TomatoesBurner/ArtFusion-AI-Hub.git
    cd ArtFusion-AI-Hub
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:

    - Create a `.env` file in the root directory of backend and add the following:

        ```env
        NODE_ENV=development
        PORT=3001

        // Database settings
        DATABASE=
        DATABASE_JEST=

        REFRESH_TOKEN_EXPIRES_IN=604800
        TWO_FACTOR_AUTH_EXPIRES_IN=120

        APP_NAME="Art Fusion AI Hub"

        // Google API settings
        GOOGLE_CLIENT_ID=
        GOOGLE_CLIENT_SECRET=

        // AI image api models lab settings
        MODELS_LAB_API_KEY=
        MODELS_LAB_TEXT_TO_IMAGE_URL=

        // Client app url
        CLIENT_APP_URL=http://localhost:3000/

        // Video api settings
        VIDEO_GENERATION_API_URL=https://videocrafter-videocrafter.hf.space/
        VIDEO_GENERATION_API_BASE_URL=https://videocrafter-videocrafter.hf.space

        // AWS settings
        AWS_S3_REGION=
        AWS_S3_ACCESS_KEY=
        AWS_S3_ACCESS_SECRET=
        AWS_S3_BUCKET_NAME=
        AWS_S3_GET_EXPIRES_IN=86400
        AWS_S3_PUT_EXPIRES_IN=600
        ```

4. Start the backend server:
    ```bash
    cd backend
    npm i
    npm run start
    ```
5. Start the frontend development server:

    ```bash
    cd front-end
    npm i
    npm run dev
    ```

6. Access the application at `http://localhost:3000`.

---

## Contributors

This project was developed by the following team members:

-   **Tao Hu** ([23805764](mailto:tao.hu@example.com))
-   **Ida Bagus Prawira Janottama Kn** ([23894575](mailto:idabagus@example.com))
-   **Xiang Li** ([23921151](mailto:xiang.li@example.com))
-   **Zihan Li** ([24049427](mailto:zihan.li@example.com))
-   **Yali Ou** ([24074405](mailto:yali.ou@example.com))
-   **Junting Yang** ([24043287](mailto:junting.yang@example.com))

---
