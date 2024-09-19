import { Schema } from "mongoose";
import { IMAGE_EXTENSION_VALUES } from "../types/imageExtensionTypes";
import { IMAGE_PROMPT_MODEL_VALUES } from "../types/imageModelPromptTypes";

const ImagePromptInputSchema = new Schema(
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

const ImagePromptResponseSchema = new Schema(
    {
        originalImageUrl: String,
        extension: {
            type: String,
            enum: IMAGE_EXTENSION_VALUES,
        },
    },
    { timestamps: true }
);

const ArgumentImagePromptResponseSchema = new Schema(
    {
        extension: {
            type: String,
            enum: IMAGE_EXTENSION_VALUES,
        },
        // TODO: If need change later
        filters: Schema.Types.Mixed,
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const ImagePromptSchema = new Schema(
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

export default ImagePrompt;
