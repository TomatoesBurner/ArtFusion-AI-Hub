const mongoose = require("mongoose");
const { IMAGE_EXTENSION_VALUES } = require("../types/imageExtensionTypes");

const ImagePromptInputSchema = new mongoose.Schema(
    {
        filters: {
            width: Number,
            height: Number,
            dpi: Number,
            aspectRatio: String,
        },
        message: String,
        fullMessage: String,
        model: String,
    },
    { _id: false }
);

const ImagePromptResponseSchema = new mongoose.Schema(
    {
        originalImageUrl: String,
        extension: {
            type: String,
            enum: IMAGE_EXTENSION_VALUES,
        },
    },
    { timestamps: true }
);

const ArgumentImagePromptResponseSchema = new mongoose.Schema(
    {
        extension: {
            type: String,
            enum: IMAGE_EXTENSION_VALUES,
        },
        // TODO: If need change later
        filters: mongoose.Schema.Types.Mixed,
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const ImagePromptSchema = new mongoose.Schema(
    {
        input: ImagePromptInputSchema,
        response: ImagePromptResponseSchema,
        argumentResponses: [ArgumentImagePromptResponseSchema],
        promptSpaceId: { type: mongoose.Types.ObjectId, ref: "PromptSpace" },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

ImagePromptSchema.index({ promptSpaceId: 1, createdAt: -1 });

const ImagePrompt = mongoose.model("ImagePrompt", ImagePromptSchema);

module.exports = ImagePrompt;
