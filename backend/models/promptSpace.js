import mongoose, { Schema } from "mongoose";

export const PromptSpaceType = {
    Image: "image",
    Video: "video",
};

export const PromptSpaceTypeValues = Object.values(PromptSpaceType);

const PromptSpaceSchema = new Schema(
    {
        type: {
            type: String,
            enum: PromptSpaceTypeValues,
            required: true,
        },
        name: String,
        description: String,
        users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

PromptSpaceSchema.index({ users: 1 }, { updatedAt: -1 });

const PromptSpace = mongoose.model("PromptSpace", PromptSpaceSchema);

export default PromptSpace;
