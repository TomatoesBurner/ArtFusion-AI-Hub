const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routers/textToVideoApiRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/video-prompt", router);

describe("Video Generation API", () => {
    it("should generate a video from a valid text prompt", async () => {
        const response = await request(app)
            .post("/api/v1/video-prompt")
            .send({ text_prompt: "A young boy eating a chocolate" })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toHaveProperty("message"); // Adjust based on actual response structure
    }, 120000); // Set a timeout if needed

    it("should return an error when text_prompt is missing", async () => {
        const response = await request(app)
            .post("/api/v1/video-prompt")
            .send({})
            .expect("Content-Type", /json/)
            .expect(500);

        expect(response.body).toHaveProperty(
            "error",
            "Video generation failed"
        );
    }, 120000);
});
