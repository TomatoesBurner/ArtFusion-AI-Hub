const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routers/textToImageApiRoutes.js"); // Adjust the path

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/image-prompt", router);

describe("Text-to-Image API", () => {
    it("should generate an image from a valid text prompt", async () => {
        const response = await request(app)
            .post("/api/v1/image-prompt")
            .send({ text_prompt: "A young boy eating a chocolate" })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("message");
    }, 10000);

    it("should return an error when text_prompt is missing", async () => {
        const response = await request(app)
            .post("/api/v1/image-prompt")
            .send({})
            .expect("Content-Type", /json/)
            .expect(500);

        expect(response.body).toHaveProperty(
            "error",
            "Image generation failed"
        );
    }, 10000);
});
