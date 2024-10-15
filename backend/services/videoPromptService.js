const { VideoPromptCreateDto } = require("../dtos/videoPromptCreateDto");
const PromptSpace = require("../models/promptSpaceModel");
const { PROMPT_SPACE_TYPE } = require("../types/promptSpaceTypes");
const AppError = require("../utils/appError");
const VideoPrompt = require("../models/videoPromptModel");
const axios = require("axios");

const {
    getPresignedUrlForGet,
    createObjectKeyFromVideo,
    uploadFileToS3,
} = require("./awsS3Service");
const { PaginationResponseDto } = require("../dtos/paginationResponseDto");
const {
    GetAllVideoPromptsInputDto,
    VideoPromptDto,
} = require("../dtos/videoPromptDto");

const generatePresignedUrlForVideoPromptDto = async (videoPromptDto) => {
    videoPromptDto.response.videoUrl = await getPresignedUrlForGet(
        createObjectKeyFromVideo(
            videoPromptDto.response.id || videoPromptDto.response._id,
            videoPromptDto.response.extension
        )
    );
};

const getAllVideoPrompts = async ({ input, userId, vpsId }) => {
    const { cursor, limit } = GetAllVideoPromptsInputDto.fromRequest(input);

    const vps = await PromptSpace.findOne({
        _id: vpsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Video,
    });

    if (!vps) {
        return {
            error: new AppError("Video prompt space not found", 404),
        };
    }

    const query = {};
    if (cursor) {
        query._id = { $lt: cursor };
    }

    const videoPrompts = await VideoPrompt.find({
        promptSpaceId: vpsId,
        ...query,
    })
        .limit(limit + 1)
        .sort({ createdAt: -1 })
        .exec();

    const hasNext = videoPrompts.length > limit;

    if (hasNext) {
        videoPrompts.pop();
    }

    const newCursor = videoPrompts[videoPrompts.length - 1]?._id;

    const videoPromptDtos = [];

    for (const videoPrompt of videoPrompts) {
        const videoPromptDto = VideoPromptDto.fromModel(videoPrompt);
        await generatePresignedUrlForVideoPromptDto(videoPromptDto);
        videoPromptDtos.push(videoPromptDto);
    }

    return {
        data: videoPromptDtos,
        pagination: new PaginationResponseDto({
            cursor: newCursor,
            limit,
            hasNext,
        }),
    };
};

const createVideoPrompt = async ({ input, vpsId, userId }) => {
    const cipInput = VideoPromptCreateDto.fromRequest(input);
    const { width, height, message, samplingSteps, cfgScale, eta, fps } =
        cipInput;

    const vps = await PromptSpace.findOne({
        _id: vpsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Video,
    });

    if (!vps) {
        return {
            error: new AppError("Video prompt space not found", 404),
        };
    }

    try {
        const { Client } = await import("@gradio/client");
        const app = await Client.connect(
            process.env.VIDEO_GENERATION_API_URL ||
                "https://videocrafter-videocrafter.hf.space/"
        );

        const result = await app.predict(1, [
            message,
            samplingSteps || 16, //
            cfgScale || 15, //
            eta || 0.5, // default ETA
            fps || 8, //  default fps
            width || 540, // default width
            height || 540, // default
        ]);

        if (!result || !result.data || !result.data[0] || !result.data[0][0]) {
            throw new AppError("Video generation failed", 500);
        }

        const video_id = result.data[0][0].name;
        const video_url = `${process.env.VIDEO_GENERATION_API_BASE_URL || "https://videocrafter-videocrafter.hf.space"}/file=${video_id}`;

        const extension = "mp4"; //

        // download video and upload to AWS S3 bucket
        const videoResponse = await axios.get(video_url, {
            responseType: "arraybuffer",
        });
        const responseVideoBuffer = Buffer.from(videoResponse.data, "base64");

        const newVideoPrompt = new VideoPrompt({
            promptSpaceId: vps._id,
            input: {
                message,
                samplingSteps,
                cfgScale,
                eta,
                fps,
                width,
                height,
                model: "default",
            },
            response: {
                originalVideoUrl: video_url,
                extension,
            },
            createdBy: userId,
        });

        const responseObjectKey = createObjectKeyFromVideo(
            newVideoPrompt.response._id,
            newVideoPrompt.response.extension
        );

        await uploadFileToS3(responseVideoBuffer, responseObjectKey);
        await newVideoPrompt.save();

        const videoPromptDto = VideoPromptDto.fromModel(newVideoPrompt);
        await generatePresignedUrlForVideoPromptDto(videoPromptDto);

        return {
            data: videoPromptDto,
        };
    } catch (error) {
        console.error("Video generation failed:", error);
        return {
            error: new AppError("Video generation failed", 500),
        };
    }
};

module.exports = {
    getAllVideoPrompts,
    createVideoPrompt,
};
