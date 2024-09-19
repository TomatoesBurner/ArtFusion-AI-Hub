/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routers/userRoutes"); //user
const imageRoutes = require("./routers/imageRoutes"); //text to image api


// CORS configuration
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3001', // Allow your frontend to access the backend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// ***************************************************
//               MIDDLEWARE SETUP
// ***************************************************
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
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
app.use("/api/text_to_image", imageRoutes); //// Text to image API
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handling middleware
app.use(globalErrorHandler);

module.exports = app;

app.get("/", (req, res) => {
    res.send("Welcome to the backend of this project cits5206!");
});
