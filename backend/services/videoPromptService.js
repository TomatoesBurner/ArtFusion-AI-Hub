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

const generateVideoPromptFullMessage = (input) => {
    const { message, samplingSteps, cfgScale, eta, fps } = input;
    return `${message}. Settings: samplingSteps=${samplingSteps}, cfgScale=${cfgScale}, eta=${eta}, fps=${fps}`;
};

const generatePresignedUrlForVideoPromptDto = async (videoPromptDto) => {
    videoPromptDto.response.videoUrl = await getPresignedUrlForGet(
        createObjectKeyFromVideo(
            videoPromptDto.response.id || videoPromptDto.response._id,
            videoPromptDto.response.extension
        )
    );
};

const createVideoPrompt = async ({ input, ipsId, userId }) => {
    const cipInput = VideoPromptCreateDto.fromRequest(input);
    const { message, samplingSteps, cfgScale, eta, fps } = cipInput;
    const fullMessage = generateVideoPromptFullMessage(cipInput);

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
            return {
                error: new AppError("Video generation failed", 500),
            };
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
                fullMessage,
                samplingSteps,
                cfgScale,
                eta,
                fps,
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
    createVideoPrompt,
};
