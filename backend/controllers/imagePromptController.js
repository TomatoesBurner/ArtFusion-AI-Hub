const catchAsync = require("../utils/catchAsync.js");
const imagePromptService = require("../services/imagePromptService.js");

const getAllImagePrompts = catchAsync(async (req, res, next) => {
    const { data, error, pagination } =
        await imagePromptService.getAllImagePrompts({
            input: {
                ...req.query,
            },
            userId: req.user._id,
            ipsId: req.params.ipsId,
        });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
        pagination: pagination,
    });
});

const createImagePrompt = catchAsync(async (req, res, next) => {
    const { data, error } = await imagePromptService.createImagePrompt({
        input: req.body,
        ipsId: req.params.ipsId,
        userId: req.user._id,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
    });
});

const createNewFilteredImage = catchAsync(async (req, res, next) => {
    const { data, error } = await imagePromptService.createNewFilteredImage({
        input: req.body,
        ipsId: req.params.ipsId,
        ipId: req.params.ipId,
        userId: req.user._id,
    });

    return error
        ? next(error)
        : res.status(200).json({
              data: data,
          });
});

const controller = {
    getAllImagePrompts,
    createImagePrompt,
    createNewFilteredImage,
};

module.exports = controller;
