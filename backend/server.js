/*****************************************************
 *                 SERVER STARTUP
 *****************************************************/
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTIONS! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

// Cannot push secret
// dotenv.config({path:'./config.env'})
dotenv.config({ path: ".env" });
const app = require("./app");
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.error("DB connection error:", err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
