const mongoose = require("mongoose");
const { PROMPT_SPACE_TYPE_VALUES } = require("../types/promptSpaceTypes");

const PromptSpaceSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: PROMPT_SPACE_TYPE_VALUES,
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

module.exports = PromptSpace;
