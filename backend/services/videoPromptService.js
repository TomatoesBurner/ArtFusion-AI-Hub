const { VideoPromptCreateDto } = require("../dtos/videoPromptCreateDto");
const PromptSpace = require("../models/promptSpaceModel");
const { PROMPT_SPACE_TYPE } = require("../types/promptSpaceTypes");
const AppError = require("../utils/appError");
const VideoPrompt = require("../models/videoPromptModel");
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

    const ips = await PromptSpace.findOne({
        _id: vpsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Video,
    });

    if (!ips) {
        return {
            error: new AppError("Video prompt space not found", 404),
        };
    }

    const query = {};
    if (cursor) {
        query._id = { $lt: cursor };
    }

    const videoPrompts = await VideoPrompt.find({
        promptSpaceId: vpId,
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

const createVideoPrompt = async ({ input, ipsId, userId }) => {
    const cipInput = VideoPromptCreateDto.fromRequest(input);
    const { width, height, message, samplingSteps, cfgScale, eta, fps } =
        cipInput;

    const ips = await PromptSpace.findOne({
        _id: ipsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Video,
    });

    if (!ips) {
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
            samplingSteps || 16, // 默认采样步数
            cfgScale || 15, // 默认 CFG scale
            eta || 1, // 默认 ETA 值
            fps || 5, // 默认帧速率
        ]);

        if (!result || !result.data || !result.data[0] || !result.data[0][0]) {
            throw new AppError("Video generation failed", 500);
        }

        const video_id = result.data[0][0].name;
        const video_url = `${process.env.VIDEO_GENERATION_API_BASE_URL || "https://videocrafter-videocrafter.hf.space"}/file=${video_id}`;

        const extension = "mp4"; // 假设生成的视频格式为 mp4

        // 下载视频并上传到 S3
        const videoResponse = await axios.get(video_url, {
            responseType: "arraybuffer",
        });
        const responseVideoBuffer = Buffer.from(videoResponse.data, "base64");

        const newVideoPrompt = new VideoPrompt({
            promptSpaceId: ips._id,
            input: {
                message,
                samplingSteps,
                cfgScale,
                eta,
                fps,
                width,
                height,
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
