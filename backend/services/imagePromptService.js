const { ImagePromptCreateDto } = require("../dtos/imagePromptCreateDto");
const {
    GetAllImagePromptsInputDto,
    ImagePromptDto,
} = require("../dtos/imagePromptDto");
const PromptSpace = require("../models/promptSpaceModel");
const { PROMPT_SPACE_TYPE } = require("../types/promptSpaceTypes");
const AppError = require("../utils/appError");
const ImagePrompt = require("../models/imagePromptModel");
const { PaginationResponseDto } = require("../dtos/paginationResponseDto");
const { default: axios } = require("axios");
const {
    createObjectKeyFromImage,
    uploadFileToS3,
    getPresignedUrlForGet,
} = require("./awsS3Service");

const modelsLabeTextToImageUrl =
    process.env.MODELS_LAB_TEXT_TO_IMAGE_URL ||
    "https://modelslab.com/api/v6/realtime/text2img";

const generateImagePromptFullMessage = (input) => {
    const { width, height, dpi, aspectRatio, message, model } = input;
    return `${message}. Settings: dpi=${dpi}, aspectRatio=${aspectRatio}, model=${model}`;
};

const generatePresignedUrlForImagePromptDto = async (imagePromptDto) => {
    imagePromptDto.response.imageUrl = await getPresignedUrlForGet(
        createObjectKeyFromImage(
            imagePromptDto.response.id || imagePromptDto.response._id,
            imagePromptDto.response.extension
        )
    );
    const argumentResponses = imagePromptDto.argumentResponses;
    if (argumentResponses) {
        for (const argumentResponse of argumentResponses) {
            argumentResponse.response.imageUrl = await getPresignedUrlForGet(
                createObjectKeyFromImage(
                    argumentResponse.id || argumentResponse._id,
                    argumentResponse.extension
                )
            );
        }
    }
};

const getAllImagePrompts = async ({ input, userId, ipsId }) => {
    const { cursor, limit } = GetAllImagePromptsInputDto.fromRequest(input);

    const ips = await PromptSpace.findOne({
        _id: ipsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Image,
    });

    if (!ips) {
        return {
            error: new AppError("Image prompt space not found", 404),
        };
    }

    const query = {};
    if (cursor) {
        query._id = { $lt: cursor };
    }

    const imagePrompts = await ImagePrompt.find({
        promptSpaceId: ipsId,
        ...query,
    })
        .limit(limit + 1)
        .sort({ createdAt: -1 })
        .exec();

    const hasNext = imagePrompts.length > limit;

    if (hasNext) {
        imagePrompts.pop();
    }

    const newCursor = imagePrompts[imagePrompts.length - 1]?._id;

    const imagePromptDtos = [];

    for (const imagePrompt of imagePrompts) {
        const imagePromptDto = ImagePromptDto.fromModel(imagePrompt);
        await generatePresignedUrlForImagePromptDto(imagePromptDto);
        imagePromptDtos.push(imagePromptDto);
    }

    return {
        data: imagePromptDtos,
        pagination: new PaginationResponseDto({
            cursor: newCursor,
            limit,
            hasNext,
        }),
    };
};

const createImagePrompt = async ({ input, ipsId, userId }) => {
    const cipInput = ImagePromptCreateDto.fromRequest(input);
    const { width, height, dpi, aspectRatio, message, model } = cipInput;
    const fullMessage = generateImagePromptFullMessage(cipInput);

    const ips = await PromptSpace.findOne({
        _id: ipsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Image,
    });

    if (!ips) {
        return {
            error: new AppError("Image prompt space not found", 404),
        };
    }

    const textToImageResponse = await axios.post(
        modelsLabeTextToImageUrl,
        {
            key: process.env.MODELS_LAB_API_KEY,
            prompt: fullMessage,
            negative_prompt: "bad quality",
            width: width,
            height: height,
            safety_checker: false,
            seed: null,
            samples: 1,
            base64: false,
            webhook: null,
            track_id: null,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (
        !textToImageResponse.data ||
        textToImageResponse.data.status == "error"
    ) {
        return {
            error: new AppError("Image generation failed", 500),
        };
    }

    const responseData = textToImageResponse.data;

    const responseImageUrl = responseData.output[0];

    const extension = responseImageUrl.split("/")?.pop()?.split(".")?.pop();

    if (!extension) {
        return {
            error: new AppError("Image generation failed", 500),
        };
    }

    const responseImageData = await axios.get(responseImageUrl, {
        responseType: "arraybuffer",
    });

    const newImagePrompt = new ImagePrompt({
        promptSpaceId: ips._id,
        input: {
            filters: {
                width: width,
                height: height,
                dpi: dpi,
                aspectRatio: aspectRatio,
            },
            message: message,
            fullMessage: fullMessage,
            model: model,
        },
        response: {
            originalImageUrl: responseImageUrl,
            extension: extension,
        },
        argumentResponses: [],
        createdBy: userId,
    });

    const responseImageBuffer = Buffer.from(responseImageData.data, "base64");

    const responseObjectKey = createObjectKeyFromImage(
        newImagePrompt.response._id,
        newImagePrompt.response.extension
    );

    await uploadFileToS3(responseImageBuffer, responseObjectKey);

    await newImagePrompt.save();

    const imagePromptDto = ImagePromptDto.fromModel(newImagePrompt);

    await generatePresignedUrlForImagePromptDto(imagePromptDto);

    return {
        data: imagePromptDto,
    };
};

module.exports = {
    getAllImagePrompts,
    createImagePrompt,
};
