import { Schema } from "mongoose";
import { VIDEO_QUALITY_VALUES } from "../types/videoQualityTypes";
import { IMAGE_EXTENSION_VALUES } from "../types/imageExtensionTypes";
import { SOUND_TRACK_EXTENSION_VALUES } from "../types/soundTrackExtensionTyps";
import { VIDEO_EXTENSION_VALUES } from "../types/videoExtensionTypes";

const VideoPromptInputImageSchema = new Schema({
    extension: {
        type: String,
        enum: IMAGE_EXTENSION_VALUES,
    },
});

const VideoPromptInputSoundTrackSchema = new Schema({
    extension: {
        type: String,
        enum: SOUND_TRACK_EXTENSION_VALUES,
    },
});

const VideoPromptInputSchema = new Schema(
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

const VideoPromptResponseSchema = new Schema(
    {
        originalVideoUrl: String,
        extension: {
            type: String,
            enum: VIDEO_EXTENSION_VALUES,
        },
    },
    { timestamps: true }
);

const VideoPromptSchema = new Schema(
    {
        input: VideoPromptInputSchema,
        response: VideoPromptResponseSchema,
        promptSpaceId: { type: mongoose.Types.ObjectId, ref: "PromptSpace" },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const VideoPrompt = mongoose.model("VideoPrompt", VideoPromptSchema);

export default VideoPrompt;
