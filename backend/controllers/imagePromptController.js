const { catchAsync } = require("../utils/catchAsync.js");
const imagePromptService = require("../services/imagePromptService.js");
const { ImagePromptCreateDto } = require("../dtos/imagePromptCreateDto.js");
const { GetAllImagePromptsInputDto } = require("../dtos/imagePromptDto.js");

const getAllImagePrompts = catchAsync(async (req, res, next) => {
    const { data, error } = await imagePromptService.getAllImagePrompts({
        input: GetAllImagePromptsInputDto.fromRequest(req.query),
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

const createImagePrompt = catchAsync(async (req, res, next) => {
    const { data, error } = await imagePromptService.createImagePrompt({
        input: ImagePromptCreateDto.fromRequest(req.body),
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

const controller = {
    getAllImagePrompts,
    createImagePrompt,
};

module.exports = controller;
