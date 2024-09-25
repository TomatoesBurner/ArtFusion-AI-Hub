const { catchAsync } = require("../utils/catchAsync.js");

const getAllImagePrompts = catchAsync(async (req, res, next) => {
    const { promptSpaceId } = req.params;
    const { cursor = null, limit = 10 } = req.query;
});

const createImagePrompt = catchAsync(async (req, res, next) => {});

const controller = {
    getAllImagePrompts,
    createImagePrompt,
};

module.exports = controller;
