const express = require("express");
const authController = require("./../controllers/authController");
const videoPromptController = require("./../controllers/videoPromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { videoPromptCreateJoiSchema } = require("../dtos/videoPromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");

const router = express.Router();

// /:ipsId/video-prompts?cursor="123"&limit=10
router.get(
    "/:ipsId/videoPrompts",
    authController.protect,
    reqDataValidate(paginationInputJoiSchema, "query"),
    videoPromptController.getAllVideoPrompts
);

router.post(
    "/:ipsId/videoPrompts",
    authController.protect,
    reqDataValidate(videoPromptCreateJoiSchema),
    videoPromptController.createVideoPrompt
);

module.exports = router;
