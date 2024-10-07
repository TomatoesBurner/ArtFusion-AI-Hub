const express = require("express");
const authController = require("./../controllers/authController");
const imagePromptController = require("./../controllers/imagePromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { imagePromptCreateJoiSchema } = require("../dtos/imagePromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");
const {
    createArgumentImagePromptResponseJoiSchema,
} = require("../dtos/createArgumentImagePromptResponseDto");

const router = express.Router();

// /:ipsId/image-prompts?cursor="123"&limit=10
router.get(
    "/:ipsId/imagePrompts",
    authController.protect,
    reqDataValidate(paginationInputJoiSchema, "query"),
    imagePromptController.getAllImagePrompts
);

router.post(
    "/:ipsId/imagePrompts",
    authController.protect,
    reqDataValidate(imagePromptCreateJoiSchema),
    imagePromptController.createImagePrompt
);

router.post(
    "/:ipsId/imagePrompts/:ipId/argumentResponse",
    authController.protect,
    reqDataValidate(createArgumentImagePromptResponseJoiSchema),
    imagePromptController.createNewFilteredImage
);

// TODO: The image filtering functionality, creating a new image

module.exports = router;
