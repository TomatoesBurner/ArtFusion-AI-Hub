/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routers/userRoutes"); //user
const textToImageApiRoutes = require("./routers/textToImageApiRoutes"); //text to image api
const textToVideoApiRoutes = require("./routers/textToVideoApiRoutes"); //text to image api

const app = express();

// CORS configuration
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3001", // Allow your frontend to access the backend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    })
);

// ***************************************************
//               GLOBAL MIDDLEWARE SETUP
// ***************************************************
// Set security HTTP headers
app.use(helmet());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//rate limiter
const limiter = rateLimit({
    max: 100, // Maximum of 100 requests per IP
    windowMs: 60 * 60 * 1000, // // Within 1 hour
    message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
// Body parser, reading data from body into req.body
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use(cors());

// ***************************************************
//              ROUTES
// ***************************************************
app.use("/api/v1/users", userRouter);
// Text to image API
app.use("/api/v1/image-prompt", textToImageApiRoutes);
// Text to video API
app.use("/api/v1/video-prompt", textToVideoApiRoutes);
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handling middleware
app.use(globalErrorHandler);

module.exports = app;

app.get("/", (req, res) => {
    res.send("Welcome to the backend of this project cits5206!");
});
