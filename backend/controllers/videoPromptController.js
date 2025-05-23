const catchAsync = require("../utils/catchAsync");
const videoPromptService = require("../services/videoPromptService");

const getAllVideoPrompts = catchAsync(async (req, res, next) => {
    const { data, error, pagination } =
        await videoPromptService.getAllVideoPrompts({
            input: {
                ...req.query,
            },
            userId: req.user._id,
            vpsId: req.params.vpsId,
        });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        data: data,
        pagination: pagination,
    });
});

const createVideoPrompt = catchAsync(async (req, res, next) => {
    const { data, error } = await videoPromptService.createVideoPrompt({
        input: req.body,
        vpsId: req.params.vpsId,
        userId: req.user._id,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        status: "Success",
        data,
        message: "Video generation success",
    });
});

const deleteVideoPrompt = catchAsync(async (req, res, next) => {
    const { error, data } = await videoPromptService.deleteVideoPrompt({
        userId: req.user._id,
        vpsId: req.params.vpsId,
        vpId: req.params.vpId,
    });

    if (error) {
        return next(error);
    }

    res.status(200).json({
        message: "Video prompt deleted",
        data: data,
    });
});

const controller = {
    createVideoPrompt,
    getAllVideoPrompts,
    deleteVideoPrompt,
};

module.exports = controller;
