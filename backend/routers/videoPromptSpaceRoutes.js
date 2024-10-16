const express = require("express");
const authController = require("./../controllers/authController");
const videoPromptController = require("./../controllers/videoPromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { videoPromptCreateJoiSchema } = require("../dtos/videoPromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");
const {
    createArgumentVideoPromptResponseJoiSchema,
} = require("../dtos/CreateArgumentVideoPromptResponseDto");
const router = express.Router();

// /:vpsId/video-prompts?cursor="123"&limit=10
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

router.delete(
    "/:vpsId/videoPrompts/:vpId",
    authController.protect,
    videoPromptController.deleteVideoPrompt
);

module.exports = router;
