const mongoose = require("mongoose");
const { VIDEO_QUALITY_VALUES } = require("../types/videoQualityTypes");
const { IMAGE_EXTENSION_VALUES } = require("../types/imageExtensionTypes");
const {
    SOUND_TRACK_EXTENSION_VALUES,
} = require("../types/soundTrackExtensionTyps");
const { VIDEO_EXTENSION_VALUES } = require("../types/videoExtensionTypes");

const VideoPromptInputImageSchema = new mongoose.Schema({
    extension: {
        type: String,
        enum: IMAGE_EXTENSION_VALUES,
    },
});

const VideoPromptInputSoundTrackSchema = new mongoose.Schema({
    extension: {
        type: String,
        enum: SOUND_TRACK_EXTENSION_VALUES,
    },
});

const VideoPromptInputSchema = new mongoose.Schema(
    {
        filters: {
            width: Number,
            height: Number,
            aspectRatio: String,
            duration: Number,
            quality: {
                type: string,
                enum: VIDEO_QUALITY_VALUES,
            },
        },
        image: VideoPromptInputImageSchema,
        soundTrack: VideoPromptInputSoundTrackSchema,
        message: String,
        fullMessage: String,
        model: String,
    },
    { _id: false }
);

const VideoPromptResponseSchema = new mongoose.Schema(
    {
        originalVideoUrl: String,
        extension: {
            type: String,
            enum: VIDEO_EXTENSION_VALUES,
        },
    },
    { timestamps: true }
);

const VideoPromptSchema = new mongoose.Schema(
    {
        input: VideoPromptInputSchema,
        response: VideoPromptResponseSchema,
        promptSpaceId: { type: mongoose.Types.ObjectId, ref: "PromptSpace" },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

VideoPromptSchema.index({ promptSpaceId: 1, createdAt: -1 });

const VideoPrompt = mongoose.model("VideoPrompt", VideoPromptSchema);

module.exports = VideoPrompt;
