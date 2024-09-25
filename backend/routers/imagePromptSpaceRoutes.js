const express = require("express");
const authController = require("./../controllers/authController");
const imagePromptController = require("./../controllers/imagePromptController");
const { reqDataValidate } = require("../middlewares/validationMiddleware");
const { imagePromptCreateJoiSchema } = require("../dtos/imagePromptCreateDto");
const { paginationInputJoiSchema } = require("../dtos/paginationInputDto");

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

// TODO: The image filtering functionality, creating a new image

module.exports = router;
