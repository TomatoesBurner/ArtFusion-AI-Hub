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
    uploadImageToS3,
    getPresignedUrlForGet,
    getPresignedUrlForPut,
} = require("./awsS3Service");
const {
    CreateArgumentImagePromptResponseDto,
} = require("../dtos/createArgumentImagePromptResponseDto");
const {
    ArgumentImagePromptResponseDto,
} = require("../dtos/argumentImagePromptResponseDto");

const modelsLabeTextToImageUrl =
    process.env.MODELS_LAB_TEXT_TO_IMAGE_URL ||
    "https://modelslab.com/api/v6/realtime/text2img";

/**
 * Generates the full message for the image prompt from the given input.
 * The full message is a concat of the input (or the settings) and the actual
 * message.
 *
 * This is used to generate full message that will be send to the actual
 * external API to generate image.
 *
 * @param {ImagePromptCreateDto} input - The input data
 * @returns {string} The full message
 */

const generateImagePromptFullMessage = (input) => {
    const { width, height, dpi, aspectRatio, message, model } = input;
    return `${message}. Settings: dpi=${dpi}, aspectRatio=${aspectRatio}, model=${model}`;
};

/**
 * Generates presigned URLs for an image prompt response and all its argument
 * responses. To be used when returning response as dto to user.
 *
 * @param {ImagePromptDto} imagePromptDto - The image prompt response
 * @returns {Promise<void>}
 */
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
            argumentResponse.imageUrl = await getPresignedUrlForGet(
                createObjectKeyFromImage(
                    argumentResponse.id || argumentResponse._id,
                    argumentResponse.extension
                )
            );
        }
    }
};

/**
 * Gets all image prompts for the given user in the given image prompt space.
 *
 * Supports pagination.
 *
 * @param {{ input: GetAllImagePromptsInputDto, userId: string, ipsId: string }} options - The input data
 * @returns {Promise<{ data: ImagePromptDto[], error: AppError, pagination: PaginationResponseDto }>} The found image prompts
 */
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
        deletedAt: { $eq: null },
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

/**
 * Creates a new image prompt based on the given input and saves it to the
 * database.
 *
 * @param {{ input: ImagePromptCreateDto, ipsId: string, userId: string }} options - The input data
 * @returns {Promise<{ data: ImagePromptDto, error: AppError }>} The created image prompt with a presigned URL
 * or an error if something went wrong
 */
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

    await uploadImageToS3(responseImageBuffer, responseObjectKey);

    await newImagePrompt.save();

    const imagePromptDto = ImagePromptDto.fromModel(newImagePrompt);

    await generatePresignedUrlForImagePromptDto(imagePromptDto);

    return {
        data: imagePromptDto,
    };
};

/**
 * Creates a new filtered image based on the given input and saves it to the
 * database. The user must have the permission on the image prompt space
 * specified in the url. The image prompt is part of the prompt space.
 *
 * @param {{ input: CreateArgumentImagePromptResponseDto, ipsId: string, ipId: string, userId: string }} options - The input data
 * @returns {Promise<{ data: ArgumentImagePromptResponseDto, error: AppError }>} The created filtered image with a presigned URL
 * or an error if something went wrong
 */
const createNewFilteredImage = async ({ input, ipsId, ipId, userId }) => {
    const { filters, extension } =
        CreateArgumentImagePromptResponseDto.fromRequest(input);

    // User has the permission on the image prompt space specified in the url
    const imagePromptSpace = await PromptSpace.findOne({
        _id: ipsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Image,
    });

    if (!imagePromptSpace) {
        return {
            error: new AppError("Image prompt space not found", 404),
        };
    }

    // The image prompt is part of the promt space
    const imagePrompt = await ImagePrompt.findOne({
        _id: ipId,
        promptSpaceId: ipsId,
        deletedAt: null,
    });

    if (!imagePrompt) {
        return {
            error: new AppError("Image prompt not found", 404),
        };
    }

    // Add the new, create and save to get the id
    imagePrompt.argumentResponses.push({
        extension: extension,
        filters: filters,
        createdBy: userId,
    });

    await imagePrompt.save();

    const newArgumentImageResponse =
        imagePrompt.argumentResponses[imagePrompt.argumentResponses.length - 1];

    // Get the keys and then create presigned url for the image for both get and
    //  put
    const newArgumentImageResponseDto =
        ArgumentImagePromptResponseDto.fromModel(newArgumentImageResponse);

    const argumentImageObjKey = createObjectKeyFromImage(
        newArgumentImageResponseDto.id,
        newArgumentImageResponseDto.extension
    );

    newArgumentImageResponseDto.imageUrl =
        await getPresignedUrlForGet(argumentImageObjKey);
    newArgumentImageResponseDto.uploadUrl =
        await getPresignedUrlForPut(argumentImageObjKey);

    return {
        data: newArgumentImageResponseDto,
    };
};

const deleteImagePrompt = async ({ userId, ipsId, ipId }) => {
    // User has the permission on the image prompt space specified in the url
    const imagePromptSpace = await PromptSpace.findOne({
        _id: ipsId,
        users: { $in: [userId] },
        type: PROMPT_SPACE_TYPE.Image,
    });

    if (!imagePromptSpace) {
        return {
            error: new AppError("Image prompt space not found", 404),
        };
    }

    // The image prompt is part of the promt space
    const imagePrompt = await ImagePrompt.findOne({
        _id: ipId,
        promptSpaceId: ipsId,
        deletedAt: null,
    });

    if (!imagePrompt) {
        return {
            error: new AppError("Image prompt not found", 404),
        };
    }

    imagePrompt.deletedAt = new Date();

    await imagePrompt.save();

    return {
        data: null,
    };
};

module.exports = {
    getAllImagePrompts,
    createImagePrompt,
    createNewFilteredImage,
    deleteImagePrompt,
};
