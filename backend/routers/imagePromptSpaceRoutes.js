const express = require("express");
const authController = require("./../controllers/authController");
const imagePromptController = require("./../controllers/imagePromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { imagePromptCreateJoiSchema } = require("../dtos/imagePromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");

const router = express.Router();

// /:ipsId/image-prompts?cursor="123"&limit=10
router.get(
    "/:ipsId/image-prompts",
    reqDataValidate(paginationInputJoiSchema, "query"),
    authController.protect,
    imagePromptController.getAllImagePrompts
);
router.post(
    "/:ipsId/image-prompts",
    reqDataValidate(imagePromptCreateJoiSchema),
    authController.protect,
    imagePromptController.createImagePrompt
);

// TODO: The image filtering functionality, creating a new image

module.exports = router;
