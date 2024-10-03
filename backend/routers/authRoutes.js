const express = require("express");
const authController = require("./../controllers/authController");
const { verifyTwoFactorJoiSchema } = require("../dtos/verifyTwoFactorDto");
const { reqDataValidate } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
    "/verifyTwoFactor",
    reqDataValidate(verifyTwoFactorJoiSchema),
    authController.verifyTwoFactor
);

router.post(
    "/enableTwoFactor",
    authController.protect,
    authController.enableTwoFactor
);

module.exports = router;
