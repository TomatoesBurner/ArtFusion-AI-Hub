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

const createNewFilteredVideo = catchAsync(async (req, res, next) => {
    const { data, error } = await videoPromptService.createNewFilteredVideo({
        input: req.body,
        vpsId: req.params.vpsId,
        vpId: req.params.vpId,
        userId: req.user._id,
    });

    return error
        ? next(error)
        : res.status(200).json({
              data: data,
          });
});

const controller = {
    createVideoPrompt,
    getAllVideoPrompts,
    createNewFilteredVideo,
};

module.exports = controller;
