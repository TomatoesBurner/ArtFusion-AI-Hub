const express = require("express");
const authController = require("./../controllers/authController");
const videoPromptController = require("./../controllers/videoPromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { videoPromptCreateJoiSchema } = require("../dtos/videoPromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");
const {
    createArgumentVideoPromptResponseJoiSchema,
} = require("../dtos/createArgumentVideoPromptResponseDto");
const router = express.Router();

// /:ipsId/video-prompts?cursor="123"&limit=10
router.get(
    "/:vpsId/videoPrompts",
    authController.protect,
    reqDataValidate(paginationInputJoiSchema, "query"),
    videoPromptController.getAllVideoPrompts
);

router.post(
    "/:vpsId/videoPrompts",
    authController.protect,
    reqDataValidate(videoPromptCreateJoiSchema),
    videoPromptController.createVideoPrompt
);

router.post(
    "/:vpsId/videoPrompts/:ipId/argumentResponse",
    authController.protect,
    reqDataValidate(createArgumentVideoPromptResponseJoiSchema),
    videoPromptController.createNewFilteredVideo
);

module.exports = router;
